import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

const MySchema = z.object({
  data: z.object({
    dragSourceId: z.string().cuid(),
    dropTargetId: z.union([z.string().cuid(), z.null()]),
  }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const parseData = MySchema.parse(data)
    const dragSourceId = parseData.data.dragSourceId
    const dropTargetId = parseData.data.dropTargetId

    try {
      if (req.method === 'PATCH') {
        const resData = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            page: {
              update: {
                where: {
                  id: dragSourceId,
                },
                data: {
                  parentId: dropTargetId,
                },
              },
            },
          },
          select: {
            page: {
              where: {
                id: dragSourceId,
              },
              select: {
                id: true,
                parentId: true,
              },
            },
          },
        })

        return res.status(200).json({
          status: 'success',
          data: {
            dragSourceId: resData.page[0].id,
            dropTargetId: resData.page[0].parentId,
          },
        })
      }
    } catch (error) {
      console.log(error)
      const { issues } = error as ZodError
      throw new Error(issues.map((err) => err.message).join(','))
    }
  })
}
