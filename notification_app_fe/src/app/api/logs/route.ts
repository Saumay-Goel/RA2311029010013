import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.EVAL_AUTH_TOKEN;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, unknown>;

  const response = await fetch(
    "http://20.207.122.201/evaluation-service/logs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();
  return NextResponse.json(data);
}
