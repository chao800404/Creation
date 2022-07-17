import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { protectRouter } from './src/utils/protectRouter'
import { isPublicFilesFilter, isAuthFilesFilter } from './src/utils/filterFile'

import { getToken } from 'next-auth/jwt'

const secret = process.env.SECRET

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret })
  const { pathname } = req.nextUrl
  const isPublicFiles = isPublicFilesFilter(req.nextUrl.pathname)
  const isAuthFiles = isAuthFilesFilter(req.nextUrl.pathname)

  if (pathname === '/' && token && !isPublicFiles)
    return protectRouter(req, '/dashboard')
  if (pathname === '/dashboard' && !token && !isPublicFiles)
    return protectRouter(req, '/')
  // if (pathname.startsWith('/api') && !token && !isPublicFiles && !isAuthFiles)
  //   return protectRouter(req, '/api/notLoggedin')

  return NextResponse.next()
}
