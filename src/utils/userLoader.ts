/* eslint-disable @typescript-eslint/ban-ts-comment */
import prisma from '../lib/prisma'
import DataLoader from 'dataloader'
import { User } from '@prisma/client'

type BatchUsers = (ids: User['id'][]) => Promise<User[]>

const batchUsers: BatchUsers = async (ids) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  })

  const userMap = users.reduce((acc: { [key: string]: User }, next) => {
    acc[next.id] = next
    return acc
  }, {})

  return ids.map((id) => userMap[id]) || new Error(`No result for ${ids}`)
}

//@ts-ignore
export const userLoader = new DataLoader(batchUsers)
