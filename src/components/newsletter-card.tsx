"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Card, Button, Input } from "@/components/ui";

export function NewsletterSubscribeCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.already) {
          setStatus("already");
        } else {
          setStatus("success");
        }
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Subscription failed.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <Card className="relative overflow-hidden border border-neutral-800 bg-[#0B0B0B] p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-300">
            <Mail className="size-3 text-neutral-400" />
            WEEKLY RESEARCH DISPATCH
          </div>
          <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-100">
            Subscribe to the Deep Tech Research Digest
          </h3>
          <p className="mt-1.5 font-sans text-sm text-neutral-400 leading-relaxed">
            Curated paper breakdowns, technical safety frameworks, and practitioner insights delivered every Tuesday. Zero marketing fluff.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
          <Input
            type="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            required
            className="bg-[#141414] border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-600 sm:w-80"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={status === "loading" || status === "success"}
            className="shrink-0"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Subscribing...
              </>
            ) : status === "success" || status === "already" ? (
              <>
                <CheckCircle2 className="size-4 text-emerald-400" /> Subscribed!
              </>
            ) : (
              <>
                Subscribe <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>
      </div>

      {status === "already" && (
        <p className="mt-3 font-mono text-xs text-emerald-400">
          You are already subscribed to the research digest. Thank you!
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 font-mono text-xs text-rose-400">
          {errorMsg}
        </p>
      )}
    </Card>
  );
}
