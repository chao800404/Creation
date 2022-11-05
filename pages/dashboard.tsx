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

const Dashboard = ({
  emojiMap,
  coverMap,
}: {
  emojiMap: EmojiBaseMap[]
  coverMap: { [key: string]: string[] }
}) => {
  const { page } = useRouter().query

  const coverImageMapSet = useCoverStore(
    (state) => state.coverImageMapSet,
    shallow
  )

  const emojiMapSet = useEmojiStore((state) => state.emojiMapSet, shallow)

  useEffect(() => {
    coverImageMapSet(coverMap)
    emojiMapSet(emojiMap)
  }, [emojiMap, coverMap])

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
  const emojiMap: ResType<{ emoji: EmojiBaseMap[] }, unknown> = await fetch(
    `${URL}/api/getImageEmojis`
  ).then((res) => res.json())

  const coverMap: ResType<unknown, { [key: string]: string[] }> = await fetch(
    `${URL}/api/getImageCover`
  ).then((res) => res.json())

  const res = await Promise.all([emojiMap, coverMap])

  return {
    props: {
      emojiMap: res[0].data?.emoji,
      coverMap: res[1].path,
    },
  }
}

export default Dashboard
