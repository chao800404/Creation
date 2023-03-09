import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import { selectPage } from '@/lib/feilds'

type MySchema = z.infer<typeof MySchema>

const MySchema = z.object({
  id: z.string().cuid({ message: 'Please provide correct ID' }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    try {
      if (req.method === 'DELETE') {
        const data = JSON.parse(req.body)
        const { id } = MySchema.parse(data)
        await prisma.page.delete({
          where: {
            id_userId: {
              id,
              userId: user.id,
            },
          },
        })

        const resData = await prisma.page.findMany({
          where: {
            userId: user.id,
          },
          select: {
            ...selectPage,
          },
        })

        res.status(200).json({
          status: 'success',
          data: resData.map((item) => ({
            id: item.id,
            parent: item.parentId || 0,
            text: item.pageConfig?.title,
            droppable: item.pageConfig?.droppable,
            data: {
              favorite: item.pageConfig?.favorite,
              editable: item.pageConfig?.editable,
              shouldShow: item.pageConfig?.shouldShow,
              emoji: item.emoji,
            },
          })),
        })
      }
    } catch (error) {
      console.log(error)
      const { issues } = error as ZodError
      throw new Error(issues.map((err) => err.message).join(','))
    }
  })
}
