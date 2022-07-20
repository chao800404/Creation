import { NextApiResponse, NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
// import prisma from '../../src/lib/prisma'
const secret = process.env.SECRET

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getUserData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST' || 'GET') {
    const token = await getToken({ req, secret })
    if (!token) {
      return res
        .status(400)
        .json({ status: 'fail', message: '你尚未登入，請先登入' })
    }

    const { email, sub } = token
    if (sub) {
      // const user = await prisma.collection.create({
      //   data: {
      //     title: 'fjoefjfjeo',
      //     published: true,
      //     authorId: sub,
      //     views: 1,
      //     cover: 'fejiwjf',
      //   },
      // })

      if (email) {
        const a = await prisma.user.findUnique({
          where: {
            email: email,
          },
          select: {
            collections: true,
          },
        })

        console.log(a)
      }
    }

    return res.status(200).json({ status: 'success', data: { token } })
  }
}
