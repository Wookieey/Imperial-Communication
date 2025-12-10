import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Cpu, KeyRound, Upload } from "lucide-react";

// Emperor AI Config Page (Hugging Face Version)
// This page is visible ONLY to the Emperor.
// It configures:
// - Hugging Face API key
// - Model selection
// - System prompt (personality)
// - Testing panel for messages

export default function EmperorAIConfig() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("meta-llama/Llama-2-13b-chat-hf");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are KX-Ω, the Emperor's personal AI unit. You obey only the Emperor and may design upgrades, generate code, and oversee the Imperial Network. Respond with precision and Imperial efficiency."
  );
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");

  // Simulated call to Hugging Face API (placeholder)
  const sendTestMessage = async () => {
    setTestOutput("Processing through Hugging Face model... (stub response)");
  };

  return (
    <div className="p-8 grid gap-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 flex items-center gap-3">
        <Shield className="text-red-600" /> Emperor AI Configuration
      </h1>

      {/* API Key */}
      <Card className="bg-zinc-900 border border-zinc-700 shadow-xl">
        <CardContent className="p-6 grid gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <KeyRound className="text-red-500" /> Hugging Face API Key
          </h2>
          <Input
            type="password"
            placeholder="Enter Hugging Face API Key"
            className="bg-black border-zinc-700"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Model Selector */}
      <Card className="bg-zinc-900 border border-zinc-700 shadow-xl">
        <CardContent className="p-6 grid gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Cpu className="text-red-500" /> Select AI Model
          </h2>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="bg-black border-zinc-700">
              <SelectValue placeholder="Choose a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meta-llama/Llama-2-7b-chat-hf">Llama 2 7B Chat</SelectItem>
              <SelectItem value="meta-llama/Llama-2-13b-chat-hf">Llama 2 13B Chat</SelectItem>
              <SelectItem value="mistralai/Mistral-7B-Instruct-v0.1">Mistral 7B Instruct</SelectItem>
              <SelectItem value="tiiuae/falcon-7b-instruct">Falcon 7B Instruct</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* System Prompt */}
      <Card className="bg-zinc-900 border border-zinc-700 shadow-xl">
        <CardContent className="p-6 grid gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Upload className="text-red-500" /> System Prompt / Personality
          </h2>
          <Textarea
            className="bg-black border-zinc-700 min-h-[150px]"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Testing Panel */}
      <Card className="bg-zinc-900 border border-zinc-700 shadow-xl">
        <CardContent className="p-6 grid gap-4">
          <h2 className="text-xl font-semibold">Test Emperor AI</h2>

          <Textarea
            placeholder="Enter a message to send to KX-Ω"
            className="bg-black border-zinc-700 min-h-[120px]"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
          />
          <Button className="bg-red-600 hover:bg-red-700" onClick={sendTestMessage}>
            Send Test Message
          </Button>

          <div className="bg-black border border-zinc-700 p-4 rounded-xl min-h-[120px] whitespace-pre-wrap mt-4">
            {testOutput || "AI response will appear here..."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
