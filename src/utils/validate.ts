import { NextApiResponse, NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { userLoader } from './userLoader'
import { User, Profile } from '@prisma/client'
const secret = process.env.NEXTAUTH_SECRET

export default async function validateUser<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  next: (user: User & { profile: Profile | null }) => Promise<T>
) {
  try {
    const user = await getToken({ req, secret })
    if (!user) throw new Error('You are not logged in')
    const userCache = await userLoader.load(user.sub as string)
    if (!userCache) throw new Error('You are not logged in')
    return await next(userCache)
  } catch (error) {
    console.log(error)
    const { message } = error as Error
    return res.status(401).json({ status: 'fail', message })
  }
}
