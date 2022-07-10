import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt'

const secret = process.env.SECRET

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret })
  const { pathname } = req.nextUrl
  const PUBLIC_FILE = /\.(.*)$/
  const isPublicFiles = PUBLIC_FILE.test(req.nextUrl.pathname)

  if (pathname === '/' && token && !isPublicFiles) {
    req.nextUrl.pathname = '/custom'
    return NextResponse.redirect(req.nextUrl)
  }

  if (pathname === '/custom' && !token && !isPublicFiles) {
    req.nextUrl.pathname = '/'
    return NextResponse.redirect(req.nextUrl)
  }

  return NextResponse.next()
}
