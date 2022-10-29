import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider, { EmailConfig } from 'next-auth/providers/email'
import prisma from '../../../src/lib/prisma'
import emailTemplate from '../../../src/utils/email.template'
import path from 'path'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { createTransport } from 'nodemailer'

const severEmail =
  process.env.NODE_ENV === 'production'
    ? process.env.EMAIL_SERVER
    : process.env.DEVELOPMENT_EMAIL_SERVER

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    EmailProvider({
      server: severEmail,
      from: '<no-reply@example.com>',
      sendVerificationRequest,
    }),
  ],
  theme: {
    colorScheme: 'light',
    logo: '/static/png/logo.png',
    brandColor: '#B3C1E5',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
}

async function sendVerificationRequest(params: {
  identifier: string
  url: string
  expires: Date
  provider: EmailConfig
  token: string
}) {
  const { identifier, url, provider } = params
  const { host } = new URL(url)

  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: `Sign in to ${host}\n${url}\n\n`,
    html: emailTemplate({ url, host }),
    attachments: [
      {
        filename: 'logo.svg',
        path: path.join(process.cwd(), 'public/static/svg/logo-2.svg'),
        cid: 'logo',
      },
    ],
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}

export default NextAuth(authOptions)
