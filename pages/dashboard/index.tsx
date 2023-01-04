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
import { MenuPopup } from '../../src/components/popup/menuPopup'
import { useStatusStore } from '../../src/store/useStatusStore'

const Dashboard = () => {
  const coverImageMapSet = useCoverStore(
    (state) => state.coverImageMapSet,
    shallow
  )
  const router = useRouter()
  const {
    query: { page },
  } = router

  const { cache } = useSWRConfig()
  const {
    data: { emoji, title },
    isLoading,
  } = useListSWR(page && (page[0] as string))

  useEffect(() => {
    fetcher('/api/getImageCover').then((coverImagePath) =>
      coverImageMapSet(coverImagePath?.path)
    )
    router.prefetch('/')
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

      <MenuPopup />
      <DashboardLayout>
        <DashboardMain />
      </DashboardLayout>
    </SWRConfig>
  )
}

export default Dashboard
