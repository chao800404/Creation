import React, { useEffect } from 'react'
import useSWR, { SWRConfig, useSWRConfig } from 'swr'
import shallow from 'zustand/shallow'
import { DashboardLayout, DashboardMain } from '../src/components'
import { useCoverStore, usePageStore } from '../src/store'
import Spinner from '../src/components/spinner/spinner'

import { NextPage } from 'next'
import { useListSWR } from '../src/hook/useListSWR'
import { fetcher } from '../src/utils/fetch'
import { useRouter } from 'next/router'
import Head from 'next/head'

const DashboardPage: NextPage = () => {
  const coverImageMapSet = useCoverStore(
    (state) => state.coverImageMapSet,
    shallow
  )
  const { page } = useRouter().query
  const {
    data: { list },
    isLoading,
  } = useListSWR(page as string)

  const {
    data: { emoji, title },
  } = useListSWR(page as string)

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('api/getImageCover')
      const coverImagePath = await res.json()
      coverImageMapSet(coverImagePath?.path)
    }

    fetcher()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Spinner />
  }

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

export default DashboardPage
