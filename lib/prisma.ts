import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

const globalWithPrisma = global as typeof globalThis & {
  prisma: Promise<PrismaClient>
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient()
  }
  prisma = globalWithPrisma.prisma
}
export default prisma
