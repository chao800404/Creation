import { Emoji, Prisma } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import cuid from 'cuid'
import { selectPage, createPage } from '@/lib/feilds'

const MySchema = z.object({
  id: z.string().cuid({ message: 'Please provide correct ID' }),
  parentId: z.union([
    z.undefined(),
    z.string().cuid({ message: 'Please provide correct' }),
  ]),
})

const data = [{ type: 'p', id: cuid(), children: [{ text: '' }] }]

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
            parentId: parentId || null,
            pageConfig: {
              create: {
                title: null,
                blockToOrder: [blockId] as Prisma.JsonArray,
              },
            },
            content: {
              create: {
                nodes: data,
              },
            },
          },
          select: {
            ...selectPage,
            children: true,
          },
        })

        res.status(200).json({
          status: 'success',
          data: {
            id: resData.id,
            parent: resData.parentId === null ? 0 : resData.parentId,
            text: resData.pageConfig?.title,
            droppable: resData.pageConfig?.droppable,
            data: {
              editable: resData.pageConfig?.editable,
              favorite: resData.pageConfig?.favorite,
              shouldShow: resData.pageConfig?.shouldShow,
              emoji: {
                id: resData.emoji?.id,
                image: resData.emoji?.image,
              },
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
