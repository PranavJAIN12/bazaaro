import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import  { NextRequest } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = ["/login", "/signup", "/verifyemail"].includes(path);

  // Get session token
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Redirect logic
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
