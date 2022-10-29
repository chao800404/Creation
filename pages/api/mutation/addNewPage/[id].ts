import { Emoji } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../../src/lib/prisma'
import validateUser from '../../../../src/utils/validate'

export default async function getUserData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id } = req.query
    await validateUser(req, res, async (user) => {
      try {
        const { authorId, emoji, createdAt, updatedAt, ...otherData } =
          await prisma.list.create({
            data: {
              authorId: user.id,
              emoji: {
                create: {},
              },
              cover: {
                create: {},
              },
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

        if (user.profile?.focusId) {
          await prisma.profile.update({
            where: {
              authorId: user.id,
            },
            data: {
              focusId: otherData.id,
            },
          })
        } else {
          await prisma.profile.create({
            data: {
              authorId: user.id,
              focusId: otherData.id,
            },
          })
        }

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
