import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider, { EmailConfig } from 'next-auth/providers/email'
import prisma from '../../../lib/prisma'

import emailTemplate from '../../../src/email.template'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { createTransport } from 'nodemailer'

export const authOptions: NextAuthOptions = {
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
      sendVerificationRequest,
    }),
  ],
  theme: {
    colorScheme: 'light',
    logo: '/static/png/logo.png',
    brandColor: '#B3C1E5',
  },
  // debug: process.env.NODE_ENV === 'development',
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.SECRET,
  },
}

async function sendVerificationRequest(params: {
  identifier: string
  url: string
  expires: Date
  provider: EmailConfig
  token: string
}) {
  console.log(params)

  const { identifier, url, provider } = params
  const { host } = new URL(url)

  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: `Sign in to ${host}\n${url}\n\n`,
    html: emailTemplate({ url, host }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}

export default NextAuth(authOptions)
