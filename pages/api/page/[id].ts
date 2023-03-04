import { Prisma } from '@prisma/client'
import { JSONParser } from 'formidable/parsers'
import { NextApiResponse, NextApiRequest } from 'next'
import { object, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

type BlockType = 'id' | 'content' | 'name' | 'type'
type SortBlocksType = Record<string, Record<BlockType, string>>

type Node<T> = Record<string, T>

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
                id: true,
              },
            },
          },
        })

        if (!resData) throw new Error('You are not allowed to query these data')

        let nodes: Node<unknown>[] = await prisma.node.findMany({
          where: {
            contentId: resData?.content?.id,
          },
        })

        nodes = nodes.map((item) => {
          const object: Node<unknown> = {}
          for (const [key, value] of Object.entries(item)) {
            if (key === 'parentId' || !!value) {
              object[key] = value
            }
          }
          return object
        })

        // console.log(nodes)

        res.status(200).json({
          status: 'success',
          data: {
            cover: resData.cover,
            nodes: nodes,
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
