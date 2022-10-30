import {
  NextApiResponse,
  NextApiRequest,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next'
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
        const resData = await prisma.list.findUnique({
          where: {
            id: params.id as string,
          },
          select: {
            authorId: true,
            cover: true,
          },
        })

        if (user.id !== resData?.authorId || !resData)
          throw new Error('You are not allowed to query these data')

        await prisma.profile.update({
          where: {
            authorId: user.id,
          },
          data: {
            focusId: params.id as string,
          },
        })

        const { authorId, ...otherData } = resData

        res.status(200).json({
          status: 'success',
          data: otherData,
        })
      } catch (error) {
        console.log(error)
        const { issues } = error as ZodError
        throw new Error(issues.map((err) => err.message).join(','))
      }
    })
  }
}
