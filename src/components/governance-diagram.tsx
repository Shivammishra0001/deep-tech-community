"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Scale, FileText, CheckCircle2, GitBranch, Cpu, Network, Lock } from "lucide-react";
import { cx } from "@/components/ui";

const NODES = [
  { id: "input", title: "Model Inference Input", type: "Input Stream", icon: Cpu, col: 0, row: 1 },
  { id: "eval_bias", title: "Bias & Demographic Parity", type: "Risk Gate 01", icon: Scale, col: 1, row: 0 },
  { id: "eval_safety", title: "Safety Guardrails & Red-Team", type: "Risk Gate 02", icon: ShieldCheck, col: 1, row: 2 },
  { id: "audit_log", title: "Immutable Audit Trail", type: "Logging Pipeline", icon: FileText, col: 2, row: 1 },
  { id: "human_review", title: "Human Oversight (HITL)", type: "Policy Node", icon: GitBranch, col: 3, row: 0 },
  { id: "compliance", title: "Verifiable Compliance Output", type: "Certified Release", icon: CheckCircle2, col: 3, row: 2 },
];

export function GovernanceDiagram({ className }: { className?: string }) {
  return (
    <div className={cx("relative w-full rounded-2xl border border-border bg-surface p-6 sm:p-8 overflow-hidden shadow-soft", className)}>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-body-soft">
          Algorithmic Audit & Risk System
        </div>
        <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-primary">
          Interconnected Policy Nodes & Verification Pipelines
        </h3>
        <p className="mt-1 font-sans text-xs sm:text-sm text-primary max-w-xl">
          Deterministic evaluation rules, automated model cards, and human-in-the-loop oversight designed for EU AI Act & NIST AI RMF compliance.
        </p>
      </div>

      {/* Nodes Grid */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10 mt-8">
        {NODES.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-4 sm:p-5 transition-all duration-300 hover:border-border-strong hover:bg-elevated/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-body-soft">
                    {node.type}
                  </span>
                  <div className="grid size-7 place-items-center rounded-lg border border-border-strong bg-card text-body transition-colors group-hover:border-border-strong group-hover:text-primary">
                    <Icon className="size-4" />
                  </div>
                </div>
                <h4 className="mt-3 font-display text-sm sm:text-base font-bold text-primary group-hover:text-primary">
                  {node.title}
                </h4>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3 font-mono text-[10px] text-body-soft">
                <span>Node 0{i + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Architectural Legend */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-4 font-mono text-xs text-body-soft">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Lock className="size-3.5 text-body-soft" /> Tamper-Proof Logs
          </span>
          <span className="flex items-center gap-1.5">
            <Network className="size-3.5 text-body-soft" /> Multi-Agent Verification
          </span>
        </div>
        <span className="text-primary">ISO/IEC 42001 & NIST AI RMF Compliant</span>
      </div>
    </div>
  );
}
