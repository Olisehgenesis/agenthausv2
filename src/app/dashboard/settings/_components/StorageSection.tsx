"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Cloud, Database, Upload, Download, CheckCircle, AlertCircle } from "lucide-react";
import { getAccountInfo, loginToStoracha } from "@/lib/storage/storacha";
import { packDataToCar, uploadCarToStoracha, retrieveCarFromCid } from "@/lib/storage/ipfs-car";

export function StorageSection() {
  const [email, setEmail] = React.useState("");
  const [loginStatus, setLoginStatus] = React.useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [accountInfo, setAccountInfo] = React.useState<{ email?: string; did?: string } | null>(null);

  const [carPayload, setCarPayload] = React.useState("{\n  \"hello\": \"world\"\n}");
  const [carResult, setCarResult] = React.useState<string | null>(null);
  const [carError, setCarError] = React.useState<string | null>(null);

  const [cidToRetrieve, setCidToRetrieve] = React.useState("");
  const [retrieveResult, setRetrieveResult] = React.useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginStatus(null);

    try {
      const res = await loginToStoracha(email);
      setLoginStatus(res.message);
    } catch (err) {
      setLoginStatus(`Login failed: ${err}`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCheckAccount = async () => {
    try {
      const info = await getAccountInfo();
      setAccountInfo(info || null);
      setLoginStatus(info ? "Storacha account loaded." : "No Storacha account active.");
    } catch (err) {
      setLoginStatus(`Account fetch failed: ${err}`);
    }
  };

  const handlePackAndUpload = async () => {
    setCarResult(null);
    setCarError(null);

    try {
      const { carBlob, rootCid } = await packDataToCar(carPayload, "agent-data.json");
      const upload = await uploadCarToStoracha(carBlob, "agent-data.car");

      setCarResult(`Uploaded CAR CID=${upload.cid}, rootID=${rootCid}. CAR URL: ${upload.url}`);
    } catch (err) {
      setCarError(String(err));
    }
  };

  const handleRetrieveCar = async () => {
    setRetrieveResult(null);
    setCarError(null);

    try {
      const result = await retrieveCarFromCid(cidToRetrieve);
      const files = result.files.map((f) => `${f.path} (${f.size} bytes)`).join("\n");
      setRetrieveResult(`Root CIDs: ${result.roots.join(", ")}\nFiles:\n${files}`);
    } catch (err) {
      setCarError(String(err));
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-accent" />
          <CardTitle>IPFS / Storacha Storage</CardTitle>
        </div>
        <CardDescription>
          Quick action panel to log in to Storacha, pack data as CAR and upload, then retrieve archived CAR.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Storacha email"
            />
            <Button onClick={handleLogin} loading={isLoggingIn}>
              <Cloud className="w-4 h-4" /> Send login link
            </Button>
            <Button onClick={handleCheckAccount}>
              <CheckCircle className="w-4 h-4" /> Check account
            </Button>
          </div>

          {accountInfo && (
            <div className="text-sm text-forest-muted">
              <p>Email: {accountInfo.email || "(not set)"}</p>
              <p>DID: {accountInfo.did || "(not available)"}</p>
            </div>
          )}

          {loginStatus && <p className="text-xs text-forest-muted">{loginStatus}</p>}

          <hr />

          <div className="space-y-2">
            <label className="text-sm font-medium">Data to pack + upload</label>
            <Textarea
              value={carPayload}
              onChange={(e) => setCarPayload(e.target.value)}
              rows={5}
            />
            <Button onClick={handlePackAndUpload}>
              <Upload className="w-4 h-4" /> Pack + Upload CAR
            </Button>
            {carResult && <div className="text-xs text-forest-muted whitespace-pre-wrap">{carResult}</div>}
          </div>

          <hr />

          <div className="space-y-2">
            <label className="text-sm font-medium">Retrieve CAR by CID</label>
            <Input
              value={cidToRetrieve}
              onChange={(e) => setCidToRetrieve(e.target.value)}
              placeholder="bafy..."
            />
            <Button onClick={handleRetrieveCar}>
              <Download className="w-4 h-4" /> Retrieve CAR
            </Button>
            {retrieveResult && <div className="text-xs text-forest-muted whitespace-pre-wrap">{retrieveResult}</div>}
          </div>

          {carError && (
            <div className="p-2 rounded bg-red-100 text-red-700 text-xs">{carError}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
