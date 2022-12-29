import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

const MySchema = z.object({
  page_id: z.string().cuid({ message: 'Please provide correct ID' }),
  reorder: z.string().cuid().array(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

    const { page_id, reorder } = MySchema.parse(data)

    try {
      if (req.method === 'PATCH') {
        const updateData = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            page: {
              update: {
                where: {
                  id_userId: {
                    userId: user.id,
                    id: page_id,
                  },
                },
                data: {
                  pageConfig: {
                    update: {
                      blockToOrder: reorder,
                    },
                  },
                },
              },
            },
          },
        })

        console.log(updateData)

        return res.status(200).json({
          status: !!updateData ? 'success' : 'fail',
          // data: updateData,
        })
      }
    } catch (error) {
      console.log(error)
      const { issues } = error as ZodError
      throw new Error(issues.map((err) => err.message).join(','))
    }
  })
}
