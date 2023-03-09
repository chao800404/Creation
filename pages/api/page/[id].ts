import { JSONParser } from 'formidable/parsers'
import { NextApiResponse, NextApiRequest } from 'next'
import { object, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import { MyValue } from '@/components/edtior/plateTypes'
import sortArray from 'sort-array'

type BlockType = 'id' | 'content' | 'name' | 'type'
type Data = {
  nodes: {
    data: []
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await validateUser(req, res, async (user) => {
      const params = req.query
      try {
        const resData = await prisma.page.findUnique({
          where: {
            id_userId: {
              id: params.id as string,
              userId: user.id,
            },
          },
          select: {
            cover: {
              select: {
                id: true,
                image: true,
              },
            },
            content: {
              select: {
                nodes: true,
              },
            },
          },
        })

        if (!resData) throw new Error('You are not allowed to query these data')
        const { cover, content } = resData

        res.status(200).json({
          status: 'success',
          data: {
            cover,
            nodes: content?.nodes || [],
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
