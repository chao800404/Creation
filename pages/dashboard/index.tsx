/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import { DashboardLayout, DashboardMain } from '../../src/components/index'
import { SWRConfig, unstable_serialize, useSWRConfig } from 'swr'
import { useListSWR } from '../../src/hook/useListSWR'
import { useRouter } from 'next/router'
import Spinner from '../../src/components/spinner/spinner'
import { fetcher } from '../../src/utils/fetch'
import { MenuPopup } from '../../src/components/popup/menuPopup'
import { useCoverStore } from '../../src/store'
import dynamic from 'next/dynamic'

const DynamicLayout = dynamic(
  import('../../src/components/layout/dashboardLayout'),
  { ssr: false }
)

const Dashboard = () => {
  const router = useRouter()
  const dataFetchedRef = useRef(false)
  const {
    query: { page },
  } = router

  const {
    data: { emoji, title, list },
    isLoading,
  } = useListSWR(page && (page[0] as string))

  useEffect(() => {
    if (dataFetchedRef.current) return

    dataFetchedRef.current = true
    const { coverImageMapSet } = useCoverStore.getState()
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
      <DynamicLayout>
        <DashboardMain />
      </DynamicLayout>
    </SWRConfig>
  )
}

export default Dashboard
