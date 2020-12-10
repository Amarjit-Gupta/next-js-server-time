import { NextResponse } from "next/server";

export const GET = (req) => {
  try {
    const now = new Date();

    // UTC ISO & timestamp
    const iso = now.toISOString();
    const timestamp = now.getTime();

    return NextResponse.json(
      { message: "current Date-time", iso, timestamp },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Time API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
