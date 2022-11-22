import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import { BlockHTML } from '@prisma/client'

// type MySchema = z.infer<typeof MySchema>
const keyEnum = ['text', 'list'] as const

const MySchema = z.object({
  page_id: z.string().cuid({ message: 'Please provide correct ID' }),
  name: z.union([z.string(), z.undefined()]),
  type: z.enum(keyEnum),
  id: z.union([
    z.string().cuid({ message: 'Please provide correct ID' }),
    z.undefined(),
  ]),
  content: z.union([z.string(), z.undefined()]),
  blockToOrder: z.string().cuid().array(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

    const { page_id, name, id, content, type, blockToOrder } =
      MySchema.parse(data)

    try {
      const resData = await prisma.page.findUnique({
        where: {
          id_userId: {
            id: page_id,
            userId: user.id,
          },
        },
      })
      if (!resData) throw new Error("You can't be updating this file")

      if (req.method === 'POST' || req.method === 'PATCH') {
        const block = await prisma.page.update({
          where: {
            id: page_id,
          },
          data: {
            blockToOrder,
            blockHTML: {
              upsert: {
                where: {
                  id,
                },
                create: {
                  name,
                  content,
                  id,
                },
                update: {
                  content: content,
                  name,
                  type,
                },
              },
            },
          },
          select: {
            blockHTML: {
              where: {
                id,
              },
              select: {
                id: true,
                name: true,
                content: true,
                type: true,
              },
            },
          },
        })

        return res.status(200).json({
          status: block ? 'success' : 'fail',
          data: block.blockHTML[0],
        })
      } else if (req.method === 'DELETE') {
        await prisma.page.update({
          where: {
            id: page_id,
          },
          data: {
            blockToOrder,
            blockHTML: {
              delete: {
                pageId_id: {
                  pageId: page_id,
                  id: id as string,
                },
              },
            },
          },
        })

        return res.status(200).json({
          status: 'success',
        })
      }
    } catch (error) {
      console.log(error)
      const { issues } = error as ZodError
      throw new Error(issues.map((err) => err.message).join(','))
    }
  })
}
