import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token");

    if (token !== process.env.NEXT_PUBLIC_TOKEN_REVALIDATE) {
        return NextResponse.json({
            token: false,
            now: Date.now(),
            err: "Your Token Wrong!",
        });
    }

    const tag = request.nextUrl.searchParams.get("tag") || "";
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
}
