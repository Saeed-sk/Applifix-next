import { NextResponse } from "next/server";
import {env} from "@/env";

export async function GET(
    req: Request,
    // declare params as a Promise
    { params }: { params: Promise<{ path: string[] }> }
) {
    // await before destructuring
    const { path } = await params;
    const upstreamUrl = env.NEXT_PUBLIC_API_URL + path.join("/");
    const upstreamRes = await fetch(upstreamUrl);
    const blob = await upstreamRes.arrayBuffer();

    const res = new NextResponse(Buffer.from(blob));
    const contentType =
        upstreamRes.headers.get("Content-Type") ?? "application/octet-stream";
    res.headers.set("Content-Type", contentType);
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
}