import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(400).json({
    status: 'fail',
    message: 'You are not logged in!',
  })
}
