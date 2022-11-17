import { NextApiResponse, NextApiRequest } from 'next'
import { ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

export default async function getUserData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await validateUser(req, res, async (user) => {
      const params = req.query
      try {
        const resData = await prisma.page.findUnique({
          where: {
            id: params.id as string,
          },
          select: {
            userId: true,
            cover: true,
            text: {
              select: {
                content: true,
                id: true,
                index: true,
                name: true,
                type: true,
              },
            },
          },
        })

        if (user.id !== resData?.userId || !resData)
          throw new Error('You are not allowed to query these data')

        const { userId, cover, ...otherData } = resData

        const blocks = Object.values(otherData)
          .flatMap((block) => block)
          .sort((a, b) => a.index - b.index)

        res.status(200).json({
          status: 'success',
          data: {
            cover,
            blocks,
          },
        })
      } catch (error) {
        console.log(error)
        const { issues } = error as ZodError
        throw new Error(issues.map((err) => err.message).join(','))
      }
    })
  }
}
