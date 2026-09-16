"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Input, Label, Button, Card } from "@/components/ui";

export function RegisterForm({ eventSlug, eventTitle }: { eventSlug: string; eventTitle: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "already" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventSlug, name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setError(data.error ?? "Something went wrong.");
      } else if (data.already) {
        setState("already");
      } else {
        setState("done");
      }
    } catch {
      setState("error");
      setError("Network error — please try again.");
    }
  }

  if (state === "done" || state === "already") {
    return (
      <Card className="text-center">
        <span className="mx-auto grid size-10 place-items-center rounded-full border border-inverted bg-inverted text-on-inverted">
          <Check className="size-4" aria-hidden />
        </span>
        <p className="mt-3 font-display text-sm font-semibold text-primary">
          {state === "already" ? "Registration Exists" : "Registration Confirmed"}
        </p>
        <p className="mt-1.5 text-xs text-body-soft">
          {state === "already"
            ? "Your email is already registered for this symposium."
            : `A calendar invitation for “${eventTitle}” has been queued for ${email}.`}
        </p>
      </Card>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label htmlFor={`reg-name-${eventSlug}`}>Full Name</Label>
        <Input
          id={`reg-name-${eventSlug}`}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dr. Ada Lovelace"
          autoComplete="name"
        />
      </div>
      <div>
        <Label htmlFor={`reg-email-${eventSlug}`}>Email Address</Label>
        <Input
          id={`reg-email-${eventSlug}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="researcher@lab.org"
          autoComplete="email"
        />
      </div>
      {state === "error" && (
        <p role="alert" className="font-mono text-xs text-primary">
          {error}
        </p>
      )}
      <Button type="submit" variant="primary" size="md" disabled={state === "loading"} className="w-full">
        {state === "loading" ? (
          <>
            <Loader2 className="size-3.5 animate-spin" aria-hidden /> Registering…
          </>
        ) : (
          "Register for Event"
        )}
      </Button>
    </form>
  );
}
