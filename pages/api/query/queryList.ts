import { PageConfig } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import { ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'

const PAGE_SELECT_FIELDS = {
  id: true,
  pageConfig: {
    select: {
      favorite: true,
      editable: true,
      shouldShow: true,
      title: true,
      droppable: true,
    },
  },
  parentId: true,
  emoji: {
    select: {
      id: true,
      image: true,
    },
  },
}

export default async function getUserData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await validateUser(req, res, async (user) => {
      try {
        const resData = await prisma.page.findMany({
          where: {
            userId: user.id,
          },
          select: {
            ...PAGE_SELECT_FIELDS,
          },
          orderBy: {
            createdAt: 'asc',
          },
        })

        res.status(200).json({
          status: 'success',
          data: resData.map((item) => ({
            id: item.id,
            parent: item.parentId || 0,
            text: item.pageConfig?.title,
            droppable: item.pageConfig?.droppable,
            data: {
              favorite: item.pageConfig?.favorite,
              editable: item.pageConfig?.editable,
              shouldShow: item.pageConfig?.shouldShow,
              emoji: item.emoji,
            },
          })),
        })
      } catch (error) {
        console.log(error)
        const { issues } = error as ZodError
        throw new Error(issues.map((err) => err.message).join(','))
      }
    })
  }
}
