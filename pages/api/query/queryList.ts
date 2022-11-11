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
      try {
        const resData = await prisma.page.findMany({
          where: {
            authorId: user.id,
          },
          select: {
            id: true,
            title: true,
            favorite: true,
            editable: true,
            emoji: {
              select: {
                id: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        })

        res.status(200).json({
          status: 'success',
          data: resData,
        })
      } catch (error) {
        console.log(error)
        const { issues } = error as ZodError
        throw new Error(issues.map((err) => err.message).join(','))
      }
    })
  }
}
