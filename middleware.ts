import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    console.log(token)
    if (token) {
      return NextResponse.rewrite(new URL('/dashboard', req.url))
    }
    return NextResponse.rewrite(new URL('/', req.url))
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token ? !!token : !!!token
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
)

export const config = { matcher: ['/'] }
