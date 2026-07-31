"use client";

import { useState } from "react";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { Container, Button, Input, Label, Select, Eyebrow, Card } from "@/components/ui";
import { DOMAIN_LIST, CHAPTERS } from "@/data/core";

const ROLES = [
  "Student / Academic Researcher",
  "Software Engineer / Systems Architect",
  "AI / Machine Learning Researcher",
  "Quantum Computing Specialist",
  "Cybersecurity Practitioner",
  "Space Systems Engineer",
  "Founder / Enterprise Executive",
  "Educator / Technical Lead",
  "Deep Tech Enthusiast",
];

const PERKS = [
  { title: "Complimentary Symposia Access", text: "Priority registration for all workshops, webinars, and summits." },
  { title: "Technical Literature Library", text: "Access peer-reviewed papers, lab notes, and technical roadmaps." },
  { title: "Regional Chapter Network", text: "In-person meetups, hands-on SOC labs, and local research circles." },
  { title: "Senior Mentorship Track", text: "Structured pairing with experienced systems engineers and researchers." },
];

export default function JoinPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [domain, setDomain] = useState("");
  const [chapter, setChapter] = useState("global");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, domain, chapter }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setError(data.error ?? "Something went wrong.");
      } else {
        setState("done");
      }
    } catch {
      setState("error");
      setError("Network error — please try again.");
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />
      <Container className="relative grid gap-12 py-20 lg:grid-cols-[1fr_480px]">
        {/* Left: pitch */}
        <div className="animate-rise">
          <Eyebrow>Society Membership</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
            Join 12,400+ Practitioners in Deep Tech.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Membership is open to students, developers, researchers, founders, educators, and technology leaders. Zero noise, high technical signal.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PERKS.map((p, i) => (
              <Card key={p.title}>
                <p className="font-mono text-xs text-neutral-400">0{i + 1}</p>
                <h3 className="mt-2 font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">{p.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {state === "done" ? (
            <Card className="text-center p-8">
              <span className="mx-auto grid size-12 place-items-center rounded-full border border-neutral-900 bg-neutral-900 text-neutral-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950">
                <Check className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                Application Received, {name.split(" ")[0]}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                Invitation details have been sent to <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">{email}</span>.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button href="/events" variant="primary" size="md">
                  Explore Events <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8">
              <h2 className="font-display text-xl font-semibold text-neutral-900 dark:text-neutral-100">Membership Application</h2>
              <p className="mt-1 text-xs text-neutral-500">Free, member-governed, enterprise-grade.</p>
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="j-name">Full Name</Label>
                  <Input id="j-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Ada Lovelace" autoComplete="name" />
                </div>
                <div>
                  <Label htmlFor="j-email">Email Address</Label>
                  <Input id="j-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="researcher@lab.org" autoComplete="email" />
                </div>
                <div>
                  <Label htmlFor="j-role">Professional Persona</Label>
                  <Select id="j-role" required value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="" disabled>Select role</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="j-domain">Primary Domain Focus</Label>
                  <Select id="j-domain" required value={domain} onChange={(e) => setDomain(e.target.value)}>
                    <option value="" disabled>Select primary domain</option>
                    {DOMAIN_LIST.map((d) => (
                      <option key={d.slug} value={d.slug}>{d.name}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="j-chapter">Regional Chapter</Label>
                  <Select id="j-chapter" value={chapter} onChange={(e) => setChapter(e.target.value)}>
                    <option value="global">Global (Online Only)</option>
                    {CHAPTERS.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.country}</option>
                    ))}
                  </Select>
                </div>
                {state === "error" && (
                  <p role="alert" className="font-mono text-xs text-neutral-900 dark:text-neutral-100">{error}</p>
                )}
                <Button type="submit" variant="primary" size="md" disabled={state === "loading"} className="w-full">
                  {state === "loading" ? "Submitting Application..." : "Submit Application"}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
}
