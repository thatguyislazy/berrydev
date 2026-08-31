"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

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
};

type N8nWorkflow = {
  id: string;
  name: string;
  active: boolean;
  tags?: WorkflowTag[];
  nodes?: {
    type?: string;
    name: string;
  }[];
};

type N8nApiResponse = {
  data: N8nWorkflow[];
};

// ── Actual Automation Projects ────────────────────────────────────────────────
//
// These are based on your documented automation experience.
// They are used as fallback data when the n8n API is unavailable.
//
// Source projects:
// - Gorgias Customer Support Weekly Performance Report
// - AI-Powered Collection Performance Monitoring System
// - Automated Reporting Dashboard
// - Email Triage & Management System
// - Job Applicant Screener
// - AI Agent Workflow
// - AI Document Processing System
// - AI-Powered Customer Support Ticket Routing

const FALLBACK_WORKFLOWS: WorkflowItem[] = [
  {
    id: "gorgias-performance-report",
    name: "Gorgias Customer Support Weekly Performance Report",
    active: true,
    tags: [
      { name: "Gorgias" },
      { name: "Claude AI" },
      { name: "Slack" },
    ],
    nodes: [
      "Gorgias",
      "Data Processing",
      "CSAT",
      "Claude AI",
      "Slack",
    ],
    description:
      "End-to-end customer support reporting workflow that pulls Gorgias ticket data, calculates response and resolution metrics, analyzes CSAT, generates insights and recommendations, and delivers weekly reports.",
    complexity: "Advanced",
  },

  {
    id: "collection-monitoring",
    name: "AI-Powered Collection Performance Monitoring",
    active: true,
    tags: [
      { name: "Claude AI" },
      { name: "CRM API" },
      { name: "Google Sheets" },
      { name: "Slack" },
    ],
    nodes: [
      "CRM API",
      "Data Processing",
      "Claude AI",
      "Performance Analysis",
      "Slack",
    ],
    description:
      "Automated collection performance pipeline that retrieves daily RPC, PTP, payment, and broken-promise data from a CRM, analyzes trends with Claude AI, identifies underperforming agents and portfolios, and generates management reports.",
    complexity: "Advanced",
  },

  {
    id: "automated-reporting-dashboard",
    name: "Automated Reporting Dashboard",
    active: true,
    tags: [
      { name: "REST API" },
      { name: "Google Sheets" },
      { name: "Notion" },
    ],
    nodes: [
      "API Sources",
      "Data Transformation",
      "Google Sheets",
      "Notion",
      "Dashboard",
    ],
    description:
      "Automated reporting pipeline that pulls data from multiple third-party APIs, transforms raw responses into structured datasets, and updates leadership dashboards in Google Sheets and Notion.",
    complexity: "Advanced",
  },

  {
    id: "email-triage",
    name: "Email Triage & Management System",
    active: true,
    tags: [
      { name: "Claude AI" },
      { name: "Gmail" },
      { name: "Slack" },
    ],
    nodes: [
      "Gmail",
      "Claude AI",
      "Classification",
      "Routing",
      "Follow-up",
    ],
    description:
      "AI-powered email management workflow that reads incoming messages, classifies them by category and urgency, routes important items to the appropriate channel, logs general inquiries, and schedules follow-ups.",
    complexity: "Advanced",
  },

  {
    id: "job-applicant-screener",
    name: "Job Applicant Screener",
    active: true,
    tags: [
      { name: "Claude AI" },
      { name: "Document Processing" },
      { name: "HR Automation" },
    ],
    nodes: [
      "Email",
      "CV Processing",
      "Claude AI",
      "Candidate Scoring",
      "HR Report",
    ],
    description:
      "End-to-end AI recruitment workflow that processes incoming CVs, evaluates candidates against role requirements, generates structured assessments, and automatically delivers screening reports to HR.",
    complexity: "Advanced",
  },

  {
    id: "ai-agent-workflow",
    name: "AI Agent Workflow",
    active: true,
    tags: [
      { name: "Claude API" },
      { name: "Function Calling" },
      { name: "n8n" },
    ],
    nodes: [
      "Event Trigger",
      "Claude AI",
      "Function Calling",
      "Validation",
      "Data Routing",
    ],
    description:
      "Agentic automation combining Claude API function-calling with n8n orchestration for document categorization, response drafting, structured output validation, and intelligent multi-system routing.",
    complexity: "Advanced",
  },

  {
    id: "ai-document-processing",
    name: "AI Document Processing System",
    active: true,
    tags: [
      { name: "Claude API" },
      { name: "React" },
      { name: "Firebase" },
    ],
    nodes: [
      "Document Input",
      "React",
      "Claude AI",
      "Validation",
      "Firebase",
    ],
    description:
      "AI-powered document processing system built with React, Firebase, and Claude API for automated document classification and summarization with structured prompt engineering and output validation.",
    complexity: "Advanced",
  },

  {
    id: "support-ticket-routing",
    name: "AI-Powered Customer Support Ticket Routing",
    active: true,
    tags: [
      { name: "Claude AI" },
      { name: "Webhook" },
      { name: "Support Automation" },
    ],
    nodes: [
      "Webhook",
      "Claude AI",
      "Classification",
      "Routing",
      "Notification",
    ],
    description:
      "AI support workflow that automatically classifies incoming tickets by urgency and category, then routes each ticket to the appropriate team channel through webhook-based automation.",
    complexity: "Advanced",
  },
];

// ── Node Icons ─────────────────────────────────────────────────────────────────

const NODE_ICONS: Record<string, string> = {
  Email: "✉",
  Gmail: "✉",
  Gorgias: "◈",
  "CRM API": "▣",
  "API Sources": "⌁",
  Webhook: "↗",
  "CV Processing": "📄",
  "Document Input": "📄",
  "Claude AI": "✦",
  "Candidate Scoring": "⭐",
  "Performance Analysis": "◉",
  Classification: "🏷",
  Routing: "⑂",
  "Data Routing": "⑂",
  Slack: "◫",
  "Google Sheets": "▤",
  Notion: "🗒",
  Firebase: "◆",
  React: "⚛",
  "Function Calling": "ƒ",
  Validation: "✓",
  "Data Processing": "⚙",
  "Data Transformation": "↔",
  CSAT: "★",
  Dashboard: "▥",
  "HR Report": "📨",
  "Team Notification": "🔔",
};

// ── Complexity Styles ──────────────────────────────────────────────────────────

const COMPLEXITY_STYLES: Record<string, string> = {
  Simple: "bg-sky-400/10 border-sky-400/20 text-sky-400",
  Medium: "bg-amber-400/10 border-amber-400/20 text-amber-400",
  Advanced: "bg-rose-400/10 border-rose-400/20 text-rose-400",
};

// ── Helpers ─────────────────────────────────────────────────────────────────────

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findFallbackWorkflow(name: string) {
  const normalizedName = normalizeName(name);

  return FALLBACK_WORKFLOWS.find((workflow) => {
    const normalizedWorkflowName = normalizeName(workflow.name);

    return (
      normalizedName === normalizedWorkflowName ||
      normalizedName.includes(normalizedWorkflowName) ||
      normalizedWorkflowName.includes(normalizedName)
    );
  });
}

function getNodeLabel(node: { type?: string; name: string }) {
  if (node.name?.trim()) {
    return node.name.trim();
  }

  if (node.type) {
    return node.type.split(".").pop() ?? node.type;
  }

  return "Node";
}

function simplifyNodeName(name: string) {
  const value = name.trim();

  const mappings: Record<string, string> = {
    "n8n-nodes-base.gmail": "Gmail",
    "n8n-nodes-base.httpRequest": "HTTP Request",
    "n8n-nodes-base.webhook": "Webhook",
    "n8n-nodes-base.googleSheets": "Google Sheets",
    "n8n-nodes-base.slack": "Slack",
    "n8n-nodes-base.notion": "Notion",
    "@n8n/n8n-nodes-langchain.lmChatAnthropic": "Claude AI",
  };

  return mappings[value] ?? value;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function AutomationSection() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [filter, setFilter] = useState<"all" | "published">("all");

  useEffect(() => {
    async function fetchWorkflows() {
      try {
        const res = await fetch("/api/n8n-workflows");

        if (!res.ok) {
          throw new Error("API error");
        }

        const data: N8nApiResponse = await res.json();

        if (data?.data?.length > 0) {
          // Remove generic/untitled workflows.
          const meaningful = data.data.filter(
            (workflow) =>
              workflow.name &&
              !/^my\s*workflow/i.test(workflow.name.trim())
          );

          const mapped: WorkflowItem[] = meaningful.map((workflow) => {
            const fallback = findFallbackWorkflow(workflow.name);

            const nodes = workflow.nodes
              ? [
                  ...new Set(
                    workflow.nodes
                      .map(getNodeLabel)
                      .map(simplifyNodeName)
                      .filter(Boolean)
                  ),
                ].slice(0, 5)
              : [];

            return {
              id: workflow.id,
              name: workflow.name,
              active: workflow.active,
              tags: workflow.tags ?? fallback?.tags ?? [],
              nodes:
                nodes.length > 0
                  ? nodes
                  : fallback?.nodes ?? ["Trigger", "Claude AI", "Action"],
              description:
                fallback?.description ??
                "Production automation workflow integrating business applications, APIs, and AI-powered processing.",
              complexity: fallback?.complexity ?? "Medium",
            };
          });

          setWorkflows(mapped);
          setIsLive(true);
        } else {
          setWorkflows(FALLBACK_WORKFLOWS);
        }
      } catch (_error) {
        setWorkflows(FALLBACK_WORKFLOWS);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkflows();
  }, []);

  const filtered =
    filter === "published"
      ? workflows.filter((workflow) => workflow.active)
      : workflows;

  // ── Loading ──────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] bg-transparent">
        <div className="mb-16">
          <div className="h-4 w-32 bg-white/[0.04] rounded animate-pulse mb-3" />
          <div className="h-8 w-64 bg-white/[0.04] rounded-lg animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-48 bg-white/[0.04] rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  // ── Empty State ──────────────────────────────────────────────────────────────

  if (!workflows.length) {
    return (
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] bg-transparent">
        <div className="text-center py-24 border border-white/[0.06] rounded-2xl">
          <Zap className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            No workflows found.
          </p>
        </div>
      </section>
    );
  }

  // ── Main Render ──────────────────────────────────────────────────────────────

  return (
    <section
      id="automations"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] bg-transparent"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
        <div className="reveal">
          <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
            Automation & AI
          </p>

          <h3 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl font-display">
            AI Workflows I&apos;ve Built
          </h3>

          <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
            Production automation systems combining n8n, APIs, AI models,
            business applications, and structured data workflows.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap reveal reveal-delay-1">
          {/* Filter */}
          <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-xl">
            {(["all", "published"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-tight transition-all duration-200 capitalize ${
                  filter === value
                    ? "bg-gradient-to-r from-accent/80 to-accent2/80 text-white shadow-md shadow-accent/10 border border-white/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          {/* Live n8n indicator */}
          {isLive && (
            <div className="flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-xs text-emerald-400 font-medium font-mono">
                Live from n8n
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Empty Filter State */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-white/[0.06] rounded-2xl">
          <p className="text-slate-500 text-sm">
            No published workflows yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((workflow) => (
            <div
              key={workflow.id}
              className="group relative p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 backdrop-blur-sm gradient-border overflow-hidden"
            >
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300 flex-shrink-0">
                      <Zap className="w-3.5 h-3.5" />
                    </span>

                    <span className="text-base font-bold text-white group-hover:text-accent transition-colors duration-200 tracking-tight leading-snug">
                      {workflow.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {workflow.complexity && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          COMPLEXITY_STYLES[workflow.complexity]
                        }`}
                      >
                        {workflow.complexity}
                      </span>
                    )}

                    {workflow.active && (
                      <span className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5 text-[10px] text-emerald-400 whitespace-nowrap font-mono">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {workflow.description}
                </p>

                {/* Pipeline */}
                <div className="flex items-center gap-1 flex-wrap mb-4">
                  {(
                    workflow.nodes.length > 0
                      ? workflow.nodes
                      : ["Trigger", "Claude AI", "Action"]
                  ).map((node, nodeIndex, array) => (
                    <span
                      key={`${node}-${nodeIndex}`}
                      className="flex items-center gap-1"
                    >
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          node.toLowerCase().includes("claude")
                            ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                            : "bg-white/[0.04] border-white/[0.06] text-slate-500"
                        }`}
                      >
                        {NODE_ICONS[node] && (
                          <span className="mr-1">
                            {NODE_ICONS[node]}
                          </span>
                        )}

                        {node}
                      </span>

                      {nodeIndex < array.length - 1 && (
                        <span className="text-slate-700 text-[10px]">
                          ›
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-500">
                      n8n
                    </span>

                    {workflow.tags.map((tag, tagIndex) => (
                      <span
                        key={`${tag.name}-${tagIndex}`}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-500"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
