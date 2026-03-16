import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

let prismaClient = globalForPrisma.prisma ?? createPrismaClient();

export { prismaClient as prisma };

function isRetryableConnectionError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return error.code === "P1017" || error.code === "P1001";
  }
  return false;
}

async function resetPrismaClient() {
  try {
    await prismaClient.$disconnect();
  } catch {
    // ignore disconnect errors; we are replacing the client anyway
  }

  prismaClient = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaClient;
  }
}

/**
 * Run a DB operation with one automatic reconnect+retry for transient closed connection errors.
 */
export async function withPrismaRetry<T>(operation: (client: PrismaClient) => Promise<T>): Promise<T> {
  try {
    return await operation(prismaClient);
  } catch (error) {
    if (!isRetryableConnectionError(error)) {
      throw error;
    }

    await resetPrismaClient();
    return operation(prismaClient);
  }
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient;
