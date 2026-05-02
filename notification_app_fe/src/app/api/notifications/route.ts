import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://20.207.122.201/evaluation-service";
const TOKEN = process.env.EVAL_AUTH_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const url = new URL(`${API_BASE_URL}/notifications`);

  // Only append params if they exist and are valid
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const notification_type = searchParams.get("notification_type");

  if (limit && !isNaN(Number(limit))) url.searchParams.append("limit", limit);
  if (page && !isNaN(Number(page))) url.searchParams.append("page", page);
  if (notification_type)
    url.searchParams.append("notification_type", notification_type);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    // Debug — remove after confirming it works
    process.stdout.write(`STATUS: ${response.status}\n`);
    process.stdout.write(
      `KEYS: ${JSON.stringify(Object.keys(data as object))}\n`,
    );

    if (!response.ok) {
      process.stdout.write(`ERROR: ${JSON.stringify(data)}\n`);
      return NextResponse.json({ notifications: [] });
    }

    return NextResponse.json(data);
  } catch (err) {
    process.stdout.write(`FETCH ERROR: ${String(err)}\n`);
    return NextResponse.json({ notifications: [] });
  }
}
