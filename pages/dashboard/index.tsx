/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Head from 'next/head'
import { DashboardLayout, DashboardMain } from '../../src/components/index'
import { SWRConfig, unstable_serialize, useSWRConfig } from 'swr'
import { useListSWR } from '../../src/hook/useListSWR'
import { useRouter } from 'next/router'
import Spinner from '../../src/components/spinner/spinner'
import { fetcher } from '../../src/utils/fetch'
import { useCoverStore } from '../../src/store'
import shallow from 'zustand/shallow'
import { usePageSWR } from '../../src/hook/usePageSWR'

const Dashboard = () => {
  const coverImageMapSet = useCoverStore(
    (state) => state.coverImageMapSet,
    shallow
  )

  const { page } = useRouter().query
  const { cache } = useSWRConfig()
  const {
    data: { emoji, title },
    isLoading,
  } = useListSWR(page && (page[0] as string))

  useEffect(() => {
    fetcher('/api/getImageCover').then((coverImagePath) =>
      coverImageMapSet(coverImagePath?.path)
    )
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  console.log(cache)

  return (
    <SWRConfig>
      <Head>
        <title>{title || 'Dashboard'}</title>
        <meta name="description" content="Creation App" />
        <link rel="icon" href={emoji ? emoji : '/favicon.ico'} />
      </Head>

      <DashboardLayout>
        <DashboardMain />
      </DashboardLayout>
    </SWRConfig>
  )
}

export default Dashboard
