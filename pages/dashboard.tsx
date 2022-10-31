/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { GetStaticPropsResult, NextApiRequest, NextApiResponse } from 'next'
import { DashboardLayout, DashboardMain } from '../src/components/index'
import { List } from '@prisma/client'
import useSWR, { SWRConfig } from 'swr'
import validateUser from '../src/utils/validate'
import { useListSWR } from '../src/hook/useListSWR'
import prisma from '../src/lib/prisma'
import { usePageStore } from '../src/store'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'
import { fetcher } from '../src/utils/fetch'

type DashboardProp = {
  fallback: {
    [path: string]: List[]
  }
}

const Dashboard = () => {
  const coverImageMapSet = usePageStore(
    (state) => state.coverImageMapSet,
    shallow
  )

  const {
    data: { list },
    isLoading,
  } = useListSWR()
  const { data: coverImagePath } = useSWR('api/getImageCover', fetcher)

  useEffect(() => {
    coverImageMapSet(coverImagePath?.path)
  }, [coverImagePath, coverImageMapSet])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <SWRConfig>
      <Head>
        {/* <title>{title}</title> */}
        <meta name="description" content="Creation App" />
        <link
        // rel="icon"
        // href={emoji ? transferEmojiToSvg(emoji) : '/favicon.ico'}
        />
      </Head>

      {list && (
        <DashboardLayout list={list}>
          <DashboardMain />
        </DashboardLayout>
      )}
    </SWRConfig>
  )
}

export default Dashboard
