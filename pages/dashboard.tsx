/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Head from 'next/head'
import { DashboardLayout, DashboardMain } from '../src/components/index'
import { SWRConfig } from 'swr'
import { useListSWR } from '../src/hook/useListSWR'
import { useRouter } from 'next/router'
import Spinner from '../src/components/spinner/spinner'

const Dashboard = () => {
  const { page } = useRouter().query

  const {
    data: { list },
    isLoading,
  } = useListSWR(page as string)

  if (isLoading) {
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

export default Dashboard
