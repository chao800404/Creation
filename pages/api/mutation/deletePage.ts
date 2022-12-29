import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

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

        console.log(id)

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
            id: true,
            pageConfig: {
              select: {
                favorite: true,
                editable: true,
                shouldShow: true,
                title: true,
                droppable: true,
              },
            },
            parentId: true,
            emoji: {
              select: {
                id: true,
                image: true,
              },
            },
          },
        })

        console.log(resData)

        // const resData = await prisma.page.findUnique({
        //   where: {
        //     id,
        //   },
        // })

        // if (!resData || resData.userId !== user.id)
        //   throw new Error("You can't delete this file")

        // const { userId, ...otherData } = await prisma.page.delete({
        //   where: {
        //     id,
        //   },
        // })

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
