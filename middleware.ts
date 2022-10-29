import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import { rewrite } from '@vercel/edge'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    if (token) {
      return rewrite(new URL('/dashboard', req.url))
    }
    return rewrite(new URL('/', req.url))
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

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret })
//   const { pathname } = req.nextUrl

//   const isPublicFiles = isPublicFilesFilter(req.nextUrl.pathname)
//   geolocation(req)

//   if (pathname === '/' && token && !isPublicFiles) {
//     return NextResponse.rewrite(new URL('/dashboard', req.url))
//   }
//   return NextResponse.next()
// }
