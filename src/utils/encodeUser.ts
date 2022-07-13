import { getToken } from 'next-auth/jwt'
import { NextApiResponse, NextApiRequest } from 'next'
const secret = process.env.SECRET

const encodeUser = async (req: NextApiRequest) => {
  const user = await getToken({ req, secret })

  return user
}

export default encodeUser
