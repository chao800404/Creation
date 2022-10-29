import { NextApiResponse, NextApiRequest } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import prisma from '../../src/lib/prisma'
import { userLoader } from './userLoader'
import { User, Profile } from '@prisma/client'
const secret = process.env.NEXTAUTH_SECRET

export default async function validateUser(
  req: NextApiRequest,
  res: NextApiResponse,
  next: (user: User & { profile: Profile | null }) => Promise<void>
) {
  try {
    const user = await getToken({ req, secret })
    if (!user) throw new Error('You are not logged in')
    const userCache = await userLoader.load(user.sub as string)
    await next(userCache)
  } catch (error) {
    console.log(error)
    const { message } = error as Error
    return res.status(401).json({ status: 'fail', message })
  }
}
