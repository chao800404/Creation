/* eslint-disable @typescript-eslint/ban-ts-comment */
import prisma from '../lib/prisma'
import DataLoader from 'dataloader'
import { Profile, User } from '@prisma/client'

type UserType = User & { profile: Profile | null }

type BatchUsers = (ids: User['id'][]) => Promise<UserType[]>

const batchUsers: BatchUsers = async (ids) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      profile: true,
    },
  })

  const userMap = users.reduce(
    (acc: { [key: string]: User & { profile: Profile | null } }, next) => {
      acc[next.id] = next
      return acc
    },
    {}
  )

  return ids.map((id) => userMap[id]) || new Error(`No result for ${ids}`)
}

//@ts-ignore
export const userLoader = new DataLoader(batchUsers)
