import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

type MySchema = z.infer<typeof MySchema>
const keyEnum = ['favorite', 'editable', 'title', 'shouldShow'] as const

const MySchema = z.object({
  id: z.string().cuid({ message: 'Please provide correct ID' }),
  key: z.enum(keyEnum),
  value: z.union([z.string(), z.boolean()]),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    try {
      if (req.method === 'PATCH') {
        const data = JSON.parse(req.body)
        const { id, key, value } = MySchema.parse(data)

        const resData = await prisma.page.findUnique({
          where: {
            id,
          },
        })

        if (!resData || resData.userId !== user.id)
          throw new Error("You can't be updating this file")

        const { id: pageId, pageConfig } = await prisma.page.update({
          where: {
            id,
          },
          data: {
            pageConfig: {
              update: {
                [key]: value,
              },
            },
          },
          select: {
            id: true,
            pageConfig: {
              select: {
                [key]: true,
              },
            },
          },
        })

        console.log(pageConfig)

        res.status(200).json({
          status: 'success',
          data: {
            id: pageId,
            ...pageConfig,
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
