/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Head from 'next/head'
import { DashboardLayout, DashboardMain } from '../src/components/index'
import { SWRConfig } from 'swr'
import { useListSWR } from '../src/hook/useListSWR'
import { useRouter } from 'next/router'
import Spinner from '../src/components/spinner/spinner'
import { URL } from '../src/utils/config'
import { EmojiBaseMap } from '@prisma/client'
import _ from 'lodash'
import { GetStaticProps } from 'next'
import { useCoverStore } from '../src/store'
import shallow from 'zustand/shallow'
import { useEmojiStore } from '../src/store'
import prisma from '../src/lib/prisma'

const Dashboard = ({ emojiMap }: { emojiMap: EmojiBaseMap[] }) => {
  const { page } = useRouter().query

  const emojiMapSet = useEmojiStore((state) => state.emojiMapSet, shallow)

  useEffect(() => {
    emojiMapSet(emojiMap)
  }, [emojiMap])

  const {
    data: { list },
    isLoading,
  } = useListSWR(page as string)

  if (isLoading || !list) {
    return <Spinner />
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

type ResType<T, K> = {
  status: 'success' | 'fail'
  data?: T
  path?: K
}

export const getStaticProps: GetStaticProps = async () => {
  const emojiMap = await prisma.emojiBaseMap.findMany({
    select: {
      image: true,
      name: true,
      id: true,
    },
  })

  return {
    props: {
      emojiMap,
    },
  }
}

export default Dashboard
