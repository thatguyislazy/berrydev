"use client";

import { useEffect, useState } from "react";
import { Zap, Clock } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type WorkflowTag = {
  name: string;
};

type WorkflowItem = {
  id: string;
  name: string;
  active: boolean;
  tags: WorkflowTag[];
  nodes: string[];
  description: string;
  complexity?: "Simple" | "Medium" | "Advanced";
  estimatedTimeSaved?: string;
};

type N8nWorkflow = {
  id: string;
  name: string;
  active: boolean;
  tags?: WorkflowTag[];
  nodes?: { type?: string; name: string }[];
};

type N8nApiResponse = {
  data: N8nWorkflow[];
};

// ── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_WORKFLOWS: WorkflowItem[] = [
  {
    id: "fallback-1",
    name: "Job Applicant Screener",
    active: true,
    tags: [{ name: "Claude Roadmap" }],
    nodes: ["Email", "Parse CV", "Claude AI", "Score", "Notify HR"],
    description:
      "Screens incoming CVs with Claude AI, scores candidates against role requirements, and sends structured reports to HR automatically.",
    complexity: "Advanced",
    estimatedTimeSaved: "~3 hrs/day",
  },
  {
    id: "fallback-2",
    name: "Instagram Reels Automation",
    active: false,
    tags: [],
    nodes: ["Topic Input", "Claude AI", "Script Gen", "Hashtags", "Notion"],
    description:
      "Generates reel scripts, captions, and 30 niche hashtags from a single topic prompt. Full content package saved to Notion.",
    complexity: "Medium",
    estimatedTimeSaved: "~1 hr/post",
  },
  {
    id: "fallback-3",
    name: "Email Triage & Management",
    active: false,
    tags: [{ name: "Claude Roadmap" }],
    nodes: ["Gmail", "Claude AI", "Classify", "Route", "Archive"],
    description:
      "Reads and classifies every inbox email by urgency and intent using Claude, then routes each to the right action channel.",
    complexity: "Advanced",
    estimatedTimeSaved: "~2 hrs/day",
  },
];

// ── Node icons map ───────────────────────────────────────────────────────────

const NODE_ICONS: Record<string, string> = {
  Email: "✉",
  Gmail: "✉",
  "Parse CV": "📄",
  "Claude AI": "✦",
  "Notify HR": "📨",
  "Topic Input": "💡",
  "Script Gen": "📝",
  Notion: "🗒",
  Classify: "🏷",
  Route: "⑂",
  Archive: "🗃",
  Transcript: "🎙",
  Draft: "✏",
  Format: "🔧",
  "PDF Export": "📋",
  Score: "⭐",
  Hashtags: "🔖",
};

const COMPLEXITY_STYLES: Record<string, string> = {
  Simple: "bg-sky-400/10 border-sky-400/20 text-sky-400",
  Medium: "bg-amber-400/10 border-amber-400/20 text-amber-400",
  Advanced: "bg-rose-400/10 border-rose-400/20 text-rose-400",
};

// ── Component ────────────────────────────────────────────────────────────────

export default function AutomationSection() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [filter, setFilter] = useState<"all" | "published">("all");

  useEffect(() => {
    async function fetchWorkflows() {
      try {
        const res = await fetch("/api/n8n-workflows");
        if (!res.ok) throw new Error("API error");
        const data: N8nApiResponse = await res.json();

        if (data?.data?.length > 0) {
          // Filter out generic/untitled workflows from n8n
          const meaningful = data.data.filter(
            (w) => w.name && !/^my\s*workflow/i.test(w.name.trim())
          );
          const mapped: WorkflowItem[] = meaningful.map((w) => ({
            id: w.id,
            name: w.name,
            active: w.active,
            tags: w.tags ?? [],
            nodes: w.nodes
              ? (
                  [
                    ...new Set(
                      w.nodes.map((n) => n.type?.split(".").pop() ?? n.name)
                    ),
                  ] as string[]
                ).slice(0, 5)
              : [],
            description:
              FALLBACK_WORKFLOWS.find((f) =>
                f.name
                  .toLowerCase()
                  .includes(w.name.toLowerCase().split(" ")[0])
              )?.description ?? "Automated workflow powered by n8n and Claude AI.",
            complexity:
              FALLBACK_WORKFLOWS.find((f) =>
                f.name
                  .toLowerCase()
                  .includes(w.name.toLowerCase().split(" ")[0])
              )?.complexity ?? "Medium",
            estimatedTimeSaved:
              FALLBACK_WORKFLOWS.find((f) =>
                f.name
                  .toLowerCase()
                  .includes(w.name.toLowerCase().split(" ")[0])
              )?.estimatedTimeSaved,
          }));
          setWorkflows(mapped);
          setIsLive(true);
        } else {
          setWorkflows(FALLBACK_WORKFLOWS);
        }
      } catch (_err) {
        setWorkflows(FALLBACK_WORKFLOWS);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkflows();
  }, []);

  const filtered =
    filter === "published" ? workflows.filter((w) => w.active) : workflows;

  // ── Loading skeleton ───────────────────────────────────────────────────────

  if (loading) {
    return (
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] bg-transparent">
        <div className="mb-16">
          <div className="h-4 w-32 bg-white/[0.04] rounded animate-pulse mb-3" />
          <div className="h-8 w-64 bg-white/[0.04] rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-white/[0.04] rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  // ── Empty state ────────────────────────────────────────────────────────────

  if (!workflows.length) {
    return (
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] bg-transparent">
        <div className="text-center py-24 border border-white/[0.06] rounded-2xl">
          <Zap className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No workflows found.</p>
        </div>
      </section>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────

  return (
    <section id="automations" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] bg-transparent">
      {/* Header — matches TechStack / Projects layout */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
        <div className="reveal">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-3">
            Automations
          </p>
          <h3 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl font-display">
            AI Workflows I&apos;ve Built
          </h3>
          <p className="text-slate-400 text-sm mt-2 max-w-lg">
            Production n8n automations powered by Claude AI — saving hours of manual work every day.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap reveal reveal-delay-1">
          {/* Filter pills */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-xl">
            {(["all", "published"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-tight transition-all duration-200 capitalize ${
                  filter === f
                    ? "bg-gradient-to-r from-accent/80 to-accent2/80 text-white shadow-md shadow-accent/10 border border-white/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Live badge */}
          {isLive && (
            <div className="flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium font-mono">Live from n8n</span>
            </div>
          )}
        </div>
      </div>

      {/* Empty filter state */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-white/[0.06] rounded-2xl">
          <p className="text-slate-500 text-sm">No published workflows yet.</p>
        </div>
      ) : (
        <>
          {/* Workflow Cards — matches Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((w, i) => (
              <div
                key={w.id}
                className="group relative p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 backdrop-blur-sm gradient-border overflow-hidden"
              >
                <div className="relative z-10">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300">
                        <Zap className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-base font-bold text-white group-hover:text-accent transition-colors duration-200 tracking-tight leading-snug">
                        {w.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {w.complexity && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${COMPLEXITY_STYLES[w.complexity]}`}
                        >
                          {w.complexity}
                        </span>
                      )}
                      {w.active && (
                        <span className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5 text-[10px] text-emerald-400 whitespace-nowrap font-mono">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                          Live
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {w.description}
                  </p>

                  {/* Pipeline nodes */}
                  <div className="flex items-center gap-1 flex-wrap mb-4">
                    {(w.nodes.length > 0 ? w.nodes : ["Trigger", "Claude AI", "Action"]).map(
                      (node, ni, arr) => (
                        <span key={ni} className="flex items-center gap-1">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                              node.toLowerCase().includes("claude")
                                ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                                : "bg-white/[0.04] border-white/[0.06] text-slate-500"
                            }`}
                          >
                            {NODE_ICONS[node] && (
                              <span className="mr-1">{NODE_ICONS[node]}</span>
                            )}
                            {node}
                          </span>
                          {ni < arr.length - 1 && (
                            <span className="text-slate-700 text-[10px]">›</span>
                          )}
                        </span>
                      )
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-500">
                        n8n
                      </span>
                      {w.tags.map((t, ti) => (
                        <span
                          key={ti}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-500"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                    {w.estimatedTimeSaved && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400/70">
                        <Clock className="w-3 h-3" />
                        {w.estimatedTimeSaved}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
