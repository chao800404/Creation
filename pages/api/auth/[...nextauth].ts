import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import prisma from '../../../lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    EmailProvider({
      server: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'c1257e13f2d0a7',
          pass: '13ca8117947111',
        },
      },
      from: '<no-reply@example.com>',
    }),
  ],

  page: {
    signIn: '/auth/signin',
  },
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   NextAuth(authOptions)

//   const token = await getToken({ req })
//   console.log('JSON Web Token', token)
// }

export default NextAuth(authOptions)
