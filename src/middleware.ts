import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { HttpStatusCode } from "axios";
import { ICurrentUserRole } from "@/utils/interface";
import { configApp } from "./utils/enum";

export async function middleware(request: NextRequest) {
    const CookieApp = request.cookies.toString();
    if (!CookieApp) {
        return NextResponse.next();
    }

    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/user/current-role",
            {
                headers: { Cookie: request.cookies.toString() },
                credentials: "include",
            }
        );

        const response: any = await res.json();
        if (response?.statusCode === HttpStatusCode.Unauthorized) {
            const redirectURL = new URL(
                `/verify?token=${configApp.token_refresh}`,
                request.url
            );
            return NextResponse.redirect(redirectURL);
        }

        const responseAPIValid = response as ICurrentUserRole;

        if (responseAPIValid.is_verify_email) {
            return NextResponse.next();
        }

        if (!responseAPIValid.is_verify_email) {
            const redirectURL = new URL("/verify", request.url);
            return NextResponse.redirect(redirectURL);
        }
    } catch (error) {
        console.log(error);
        const redirectURL = new URL(
            `/verify?token=${configApp.token_refresh}`,
            request.url
        );
        return NextResponse.redirect(redirectURL);
    }
}

export const config = {
    matcher: ["/"],
};
