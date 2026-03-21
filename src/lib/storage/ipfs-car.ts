import { createFileEncoderStream, createDirectoryEncoderStream, CAREncoderStream } from "ipfs-car";
import { CarReader } from "@ipld/car";
import { recursive } from "ipfs-unixfs-exporter";
import { uploadToStoracha, getIPFSUrl as getStorachaUrl, getAllGateways as getStorachaGateways } from "./storacha";

export interface CarPackResult {
  carBlob: Blob;
  carCid: string;
  rootCid: string;
  carUrl: string;
  rootUrl: string;
  size: number;
}

export interface CarExtractedFile {
  path: string;
  type: string;
  size: number;
  content: string;
}

function appendChunksToUint8Array(chunks: Uint8Array[]) {
  const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

async function streamToArrayBuffer(stream: ReadableStream<Uint8Array> | null): Promise<ArrayBuffer> {
  if (!stream) {
    throw new Error("No stream provided");
  }

  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
    }
  }

  return appendChunksToUint8Array(chunks).buffer;
}

export async function packDataToCar(
  data: string | Record<string, unknown>,
  filename: string = "data.json",
  noWrap = false
): Promise<{ carBlob: Blob; rootCid: string; size: number }> {
  const payload = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  const sourceBlob = new Blob([payload], { type: "application/json" });
  const file = new File([sourceBlob], filename, { type: "application/json" });

  const blockStream = noWrap
    ? createFileEncoderStream(file)
    : createDirectoryEncoderStream([{ name: filename, stream: () => file.stream() }]);

  const carEncoder = new CAREncoderStream();
  const carData = await streamToArrayBuffer(blockStream.pipeThrough(carEncoder));

  const rootCid = carEncoder.finalBlock?.cid?.toString();
  if (!rootCid) {
    throw new Error("Failed to compute root CID while packing CAR");
  }

  const carBlob = new Blob([carData], { type: "application/car" });

  return {
    carBlob,
    rootCid,
    size: carBlob.size,
  };
}

export async function extractCar(carBlob: Blob): Promise<{ roots: string[]; files: CarExtractedFile[] }> {
  const bytes = new Uint8Array(await carBlob.arrayBuffer());
  const reader = await CarReader.fromBytes(bytes);
  const roots = (await reader.getRoots()).map((r) => r.toString());

  const files: CarExtractedFile[] = [];

  for (const root of roots) {
    const blockstore = {
      get: async (cid: any) => {
        const block = await reader.get(cid);
        if (!block) return undefined;
        return block.bytes;
      },
    };

    for await (const entry of recursive(root, blockstore as any)) {
      if (entry.type !== "file") continue;
      const chunks: Uint8Array[] = [];
      for await (const chunk of entry.content()) {
        chunks.push(chunk);
      }
      const buffer = appendChunksToUint8Array(chunks);
      const text = new TextDecoder().decode(buffer);

      files.push({
        path: entry.path || "",
        type: entry.type,
        size: buffer.length,
        content: text,
      });
    }
  }

  return { roots, files };
}

export async function uploadCarToStoracha(carBlob: Blob, filename = "archive.car") {
  const uploadResult = await uploadToStoracha(carBlob, filename);
  return {
    ...uploadResult,
    rootUrl: getStorachaUrl(uploadResult.cid, "storacha"),
    gateways: getStorachaGateways(uploadResult.cid),
  };
}

export async function retrieveCarFromCid(cid: string) {
  const gateways = getStorachaGateways(cid);
  let lastError: unknown;

  for (const g of gateways) {
    try {
      const res = await fetch(g);
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} ${res.statusText}`);
        continue;
      }
      const carBlob = new Blob([await res.arrayBuffer()], { type: "application/car" });
      const extracted = await extractCar(carBlob);
      return {
        cid,
        carBlob,
        carUrl: g,
        roots: extracted.roots,
        files: extracted.files,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`Failed to retrieve CAR ${cid} from all gateways: ${lastError}`);
}

export async function getCarGatewayUrls(cid: string): Promise<string[]> {
  return getStorachaGateways(cid);
}

export function getCarGatewayUrl(cid: string): string {
  return getStorachaUrl(cid, "storacha");
}
