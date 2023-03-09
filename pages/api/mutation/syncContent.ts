import { MyValue } from './../../../src/components/edtior/plateTypes'
import { Prisma } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import { updatePageContent } from '@/lib/feilds'
import { MyRootBlock } from '@/components/edtior/plateTypes'

// type MySchema = z.infer<typeof MySchema>
const keyEnum = ['text', 'list', 'code', 'table', 'button'] as const

// const MySchema = z.object({
//   page_id: z.string().cuid({ message: 'Please provide correct ID' }),
//   name: z.union([z.string(), z.undefined()]),
//   type: z.enum(keyEnum),
//   id: z.union([
//     z.string().cuid({ message: 'Please provide correct ID' }),
//     z.undefined(),
//   ]),
//   content: z.union([z.string(), z.undefined()]),
//   blockToOrder: z.string().cuid().array(),
// })

type Nodes = Record<string, MyRootBlock>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    try {
      if (req.method === 'PATCH') {
        const { data, id }: { data: MyValue; id: string } =
          typeof req.body === 'string' ? JSON.parse(req.body) : req.body

        // console.log(nodes)

        await prisma.page.update({
          where: {
            id_userId: {
              id,
              userId: user.id,
            },
          },
          data: {
            content: {
              update: {
                nodes: data as Prisma.JsonArray,
              },
            },
          },
        })

        return res.status(200).json({
          status: 'success',
        })
      }
    } catch (error) {
      console.log(error)
      const { issues } = error as ZodError
      throw new Error(issues.map((err) => err.message).join(','))
    }
  })
}
