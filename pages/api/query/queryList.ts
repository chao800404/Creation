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
        const resData = await prisma.list.findMany({
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

        const profile = await prisma.profile.findUnique({
          where: {
            authorId: user.id,
          },
        })

        if (!profile) throw new Error('Document not yet created')

        res.status(200).json({
          status: 'success',
          data: resData,
          focusId: profile.focusId,
        })
      } catch (error) {
        console.log(error)
        const { issues } = error as ZodError
        throw new Error(issues.map((err) => err.message).join(','))
      }
    })
  }
}
