import { Prisma } from '@prisma/client'
import { JSONParser } from 'formidable/parsers'
import { NextApiResponse, NextApiRequest } from 'next'
import { ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

type BlockType = 'id' | 'content' | 'name' | 'type'

export default async function getUserData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await validateUser(req, res, async (user) => {
      const params = req.query
      try {
        const resData = await prisma.page.findUnique({
          where: {
            id_userId: {
              id: params.id as string,
              userId: user.id,
            },
          },
          select: {
            userId: true,
            cover: true,
            text: {
              select: {
                content: true,
                id: true,
                name: true,
                type: true,
              },
              orderBy: {},
            },
            blockToOrder: true,
          },
        })

        if (!resData) throw new Error('You are not allowed to query these data')

        const { userId, cover, blockToOrder, ...otherData } = resData

        const blocks = Object.values(otherData).flatMap((block) => block)

        res.status(200).json({
          status: 'success',
          data: {
            cover,
            blocks,
            blockToOrder,
          },
        })
      } catch (error) {
        console.log(error)
        const { issues } = error as ZodError
        throw new Error(issues.map((err) => err.message).join(','))
      }
    })
  }
}
