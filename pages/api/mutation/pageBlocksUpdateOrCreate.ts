import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

// type MySchema = z.infer<typeof MySchema>
const keyEnum = ['text'] as const

const MySchema = z.object({
  page_id: z.string().cuid({ message: 'Please provide correct ID' }),
  name: z.enum(keyEnum),
  index: z.number(),
  id: z.union([
    z.string().cuid({ message: 'Please provide correct ID' }),
    z.undefined(),
  ]),
  content: z.union([z.string(), z.undefined()]),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    let block

    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    // console.log(data)
    const { page_id, name, index, id, content } = MySchema.parse(data)

    try {
      const resData = await prisma.page.findUnique({
        where: {
          id: page_id,
        },
      })
      if (!resData || resData.userId !== user.id)
        throw new Error("You can't be updating this file")
      switch (req.method) {
        case 'POST':
          block = await prisma[name].create({
            data: {
              pageId: page_id,
              index: index,
            },
            select: {
              id: true,
              name: true,
              index: true,
            },
          })
          break
        case 'PATCH':
          block = await prisma[name].update({
            where: {
              id,
            },
            data: {
              content: content,
              index: index,
            },
            select: {
              id: true,
              name: true,
              index: true,
              content: true,
            },
          })

          break
        default:
          block = undefined
      }

      res.status(200).json({
        status: 'success',
        data: block,
      })
    } catch (error) {
      console.log(error)
      const { issues } = error as ZodError
      throw new Error(issues.map((err) => err.message).join(','))
    }
  })
}
