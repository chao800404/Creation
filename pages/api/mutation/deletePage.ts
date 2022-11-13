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

        const resData = await prisma.page.findUnique({
          where: {
            id,
          },
        })

        if (!resData || resData.userId !== user.id)
          throw new Error("You can't delete this file")

        const { userId, ...otherData } = await prisma.page.delete({
          where: {
            id,
          },
        })

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
