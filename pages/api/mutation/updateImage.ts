import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import { Cover, Emoji } from 'prisma/prisma-client'

type MySchema = z.infer<typeof MySchema>
const keyEnum = ['emoji', 'cover'] as const

const MySchema = z.object({
  id: z.string().cuid({ message: 'Please provide correct ID' }),
  key: z.enum(keyEnum),
  src: z.union([z.string().startsWith('/static'), z.string().length(0)]),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    try {
      if (req.method === 'PATCH') {
        const data = JSON.parse(req.body)
        const { id, key, src } = MySchema.parse(data)

        const resData = await prisma.list.findUnique({
          where: {
            id,
          },
        })

        if (!resData || resData.authorId !== user.id)
          throw new Error("You can't be updating this file")

        let updateData: Cover | Emoji | null = null

        if (key === 'cover') {
          updateData = await prisma.cover.update({
            where: {
              listId: resData.id,
            },
            data: {
              image: src,
            },
          })
        }

        if (key === 'emoji') {
          updateData = await prisma.emoji.update({
            where: {
              listId: resData.id,
            },
            data: {
              image: src,
            },
          })
        }

        console.log(updateData)

        if (!updateData) throw new Error('Please provide correct key')

        res.status(200).json({
          status: 'success',
          data: updateData,
        })
      }
    } catch (error) {
      console.log(error)
      const { issues } = error as ZodError
      throw new Error(issues.map((err) => err.message).join(','))
    }
  })
}
