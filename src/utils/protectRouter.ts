import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function protectRouter(req: NextRequest, path: string) {
  req.nextUrl.pathname = path
  return NextResponse.rewrite(req.nextUrl)
}

export function protectRouterRedirect(req: NextRequest, path: string) {
  req.nextUrl.pathname = path
  return NextResponse.redirect(req.nextUrl)
}
