import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { NextApiResponse, NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'

const secret = process.env.SECRET

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret })

  if (req.nextUrl.pathname.startsWith('/')) {
    try {
      if (!token) {
        return NextResponse.rewrite(new URL('/', req.url))
      }
      return NextResponse.rewrite(new URL('/custom', req.url))
    } catch (error) {
      console.log(error)
    }
  }
}
export const config = {
  matcher: ['/', '/custom'],
}
