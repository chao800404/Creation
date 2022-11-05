import { NextApiResponse, NextApiRequest } from 'next'
import prisma from '../../src/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const result = await prisma.emojiBaseMap.findMany({
        select: {
          image: true,
          name: true,
          id: true,
        },
      })

      res.status(200).json({ status: 'success', data: { emoji: result } })
    } else res.status(400).json({ status: 'fail', message: 'Bad request' })
  } catch (error) {
    const { message } = error as Error
    res.status(401).json({ status: 'fail', message: message })
  }
}
