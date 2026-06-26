import { NextResponse } from "next/server";

type N8nNode = {
  type?: string;
  name: string;
};

type N8nTag = {
  id: string;
  name: string;
};

type N8nWorkflowRaw = {
  id: string;
  name: string;
  active: boolean;
  tags?: N8nTag[];
  nodes?: N8nNode[];
  createdAt?: string;
  updatedAt?: string;
};

type N8nListResponse = {
  data: N8nWorkflowRaw[];
  nextCursor?: string | null;
};

export async function GET() {
  // ✅ Read env vars INSIDE the function — not at module level
  const N8N_BASE_URL = process.env.N8N_BASE_URL ?? "https://n8n-berry.onrender.com";
  const N8N_API_KEY = process.env.N8N_API_KEY ?? "";

  console.log("[n8n-workflows] KEY:", N8N_API_KEY?.slice(0, 15) ?? "undefined");

  if (!N8N_API_KEY) {
    console.warn("[n8n-workflows] N8N_API_KEY is not set — returning empty list.");
    return NextResponse.json({ data: [] }, { status: 200 });
  }

  try {
    const url = `${N8N_BASE_URL}/api/v1/workflows?limit=25`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-N8N-API-KEY": N8N_API_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[n8n-workflows] n8n API responded with ${response.status}: ${response.statusText}`);
      return NextResponse.json(
        { error: "Failed to fetch from n8n", data: [] },
        { status: response.status }
      );
    }

    const json: N8nListResponse = await response.json();

    const normalised = (json.data ?? []).map((w) => ({
      id: w.id,
      name: w.name,
      active: w.active,
      tags: w.tags ?? [],
      nodes: (w.nodes ?? []).map((n) => ({
        type: n.type ?? null,
        name: n.name,
      })),
      createdAt: w.createdAt ?? null,
      updatedAt: w.updatedAt ?? null,
    }));

    return NextResponse.json({ data: normalised }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[n8n-workflows] Unexpected error:", message);
    return NextResponse.json(
      { error: "Internal server error", data: [] },
      { status: 500 }
    );
  }
}