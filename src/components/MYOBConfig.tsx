import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initializeMYOBConfig, getMYOBConfig } from "@/services/myobService";
import { toast } from "@/components/ui/use-toast";

export const MYOBConfig = () => {
  const [apiKey, setApiKey] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://api.myob.com/accountright/");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      initializeMYOBConfig({
        apiKey,
        clientId,
        clientSecret,
        baseUrl
      });
      toast({
        title: "Success",
        description: "MYOB configuration has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save MYOB configuration",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center">MYOB API Configuration</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter MYOB API Key"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientId">Client ID</Label>
          <Input
            id="clientId"
            type="password"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Enter Client ID"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientSecret">Client Secret</Label>
          <Input
            id="clientSecret"
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            placeholder="Enter Client Secret"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="baseUrl">Base URL</Label>
          <Input
            id="baseUrl"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="Enter MYOB API Base URL"
          />
        </div>

        <Button type="submit" className="w-full">
          Save Configuration
        </Button>
      </form>
    </Card>
  );
};