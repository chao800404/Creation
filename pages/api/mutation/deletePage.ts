import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

type MySchema = z.infer<typeof MySchema>
const keyEnum = ['favorite', 'editable', 'title'] as const

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

        const resData = await prisma.list.findUnique({
          where: {
            id,
          },
        })

        if (!resData || resData.authorId !== user.id)
          throw new Error("You can't delete this file")

        const { authorId, ...otherData } = await prisma.list.delete({
          where: {
            id,
          },
        })

        console.table(otherData)

        res.status(200).json({
          status: 'success',
          data: {
            ...otherData,
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
