import { Emoji, Prisma } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import cuid from 'cuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id } = req.query
    if (!id) throw new Error('Please provide id')
    await validateUser(req, res, async (user) => {
      const blockId = cuid()
      try {
        const { userId, emoji, createdAt, updatedAt, ...otherData } =
          await prisma.page.create({
            data: {
              id: id as string,
              userId: user.id,
              emoji: {
                create: {},
              },
              cover: {
                create: {},
              },
              text: {
                create: {
                  id: blockId,
                },
              },
              blockToOrder: [blockId] as Prisma.JsonArray,
            },
            include: {
              emoji: {
                select: {
                  id: true,
                  image: true,
                },
              },
            },
          })

        res.status(200).json({
          status: 'success',
          data: {
            ...otherData,
            emoji: (emoji as unknown as Emoji[])[0],
            prevId: id,
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
