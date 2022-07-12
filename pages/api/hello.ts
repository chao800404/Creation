import { NextApiResponse, NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  // const token = await getToken({ req, secret })

  // console.log(req)
  res.status(200).send('hello')
}
