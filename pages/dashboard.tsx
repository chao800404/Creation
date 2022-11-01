/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Head from 'next/head'
import { DashboardLayout, DashboardMain } from '../src/components/index'
import useSWR, { SWRConfig } from 'swr'
import { useListSWR } from '../src/hook/useListSWR'
import { useCoverStore, usePageControllerStore } from '../src/store'
import shallow from 'zustand/shallow'
import { fetcher } from '../src/utils/fetch'

const Dashboard = () => {
  const coverImageMapSet = useCoverStore(
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
