/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { GetStaticPropsResult, NextApiRequest, NextApiResponse } from 'next'
import { DashboardLayout, DashboardMain } from '../src/components/index'
import { List, PrismaClient } from '@prisma/client'
import { SWRConfig } from 'swr'
import validateUser from '../src/utils/validate'
import { useFetch } from '../src/hook/useFetch'

type DashboardProp = {
  fallback: {
    [path: string]: List[]
  }
}

const Dashboard = ({ fallback }: DashboardProp) => {
  const { data, isLoading, isError } = useFetch<List[]>()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const { data: listData, status } = data

  if (status === 'fail') {
    return <div>Somthing Error...</div>
  }

  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        {/* <title>{title}</title> */}
        <meta name="description" content="Creation App" />
        <link
        // rel="icon"
        // href={emoji ? transferEmojiToSvg(emoji) : '/favicon.ico'}
        />
      </Head>
      <DashboardLayout list={listData}>
        <DashboardMain />
      </DashboardLayout>
    </SWRConfig>
  )
}

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}): Promise<GetStaticPropsResult<DashboardProp>> => {
  try {
    const list = await validateUser(req, res, (user) => {
      const prisma = new PrismaClient()
      return prisma.list.findMany({
        where: {
          authorId: user.id,
        },
        select: {
          id: true,
          title: true,
          favorite: true,
          editable: true,
          emoji: {
            select: {
              id: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      })
    })

    return {
      props: {
        fallback: {
          '/api/query/queryList': list as unknown as List[],
        },
      },
    }
  } catch (error) {
    console.log(error)
    return {
      redirect: {
        destination: '/login',
        statusCode: 307,
      },
    }
  }
}

export default Dashboard
