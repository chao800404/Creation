import { getToken } from 'next-auth/jwt'
import { NextApiResponse, NextApiRequest } from 'next'
const secret = process.env.SECRET

const encodeUser = async (req: NextApiRequest) =>
  await getToken({ req, secret })

export default encodeUser
