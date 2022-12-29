import { Emoji, Prisma } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import cuid from 'cuid'

const MySchema = z.object({
  id: z.string().cuid({ message: 'Please provide correct ID' }),
  parentId: z.union([
    z.undefined(),
    z.string().cuid({ message: 'Please provide correct' }),
  ]),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const parseParentId =
      req.query.parentId !== 'undefined' ? req.query.parentId : undefined

    const { id, parentId } = MySchema.parse({
      id: req.query.id,
      parentId: parseParentId,
    })

    await validateUser(req, res, async (user) => {
      const blockId = cuid()

      try {
        const resData = await prisma.page.create({
          data: {
            id: id,
            userId: user.id,
            emoji: {
              create: {},
            },
            cover: {
              create: {},
            },
            blockHTML: {
              create: {
                id: blockId,
              },
            },
            parentId: parentId || null,
            pageConfig: {
              create: {
                title: null,
                blockToOrder: [blockId] as Prisma.JsonArray,
              },
            },
            children: {},
          },
          select: {
            id: true,
            emoji: {
              select: {
                id: true,
                image: true,
              },
            },
            pageConfig: {
              select: {
                title: true,
                favorite: true,
                editable: true,
                shouldShow: true,
                droppable: true,
              },
            },
            parentId: true,
            children: true,
          },
        })

        res.status(200).json({
          status: 'success',
          data: {
            id: resData.id,
            parent: resData.parentId || 0,
            text: resData.pageConfig?.title,
            droppable: resData.pageConfig?.droppable,
            data: {
              favorite: resData.pageConfig?.favorite,
              editable: resData.pageConfig?.editable,
              hasChild: resData.children.length > 0,
              shouldShow: resData.pageConfig?.shouldShow,
              emoji: resData.emoji,
            },
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
