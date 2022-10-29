/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { SIDE_OPTION } from '../src/utils/config'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

import { GetStaticProps, GetStaticPropsResult } from 'next'
import { URL } from '../src/utils/config'
import { useUserStore, usePageStore } from '../src/store'

import { useFetch } from '../src/hook/useFetch'

import { DashboardLayout } from '../src/components/index'

import shallow from 'zustand/shallow'

type DashboardProp = {
  paths: {
    status: string
    path: {
      [key: string]: string[]
    }
  }
}

const { searchBarBtn, interfaces, workspaces, importFile, trash, newPage } =
  SIDE_OPTION

const Dashboard = (props: DashboardProp) => {
  const { data, status } = useSession()
  const { data: listData, isLoading, isError } = useFetch()

  const { list, listUpdate, coverImageMapSet } = usePageStore(
    (state) => ({
      list: state.list,
      listUpdate: state.listUpdate,
      coverImageMapSet: state.coverImageMapSet,
    }),
    shallow
  )

  const userSet = useUserStore((state) => state.userSet, shallow)

  useEffect(() => {
    coverImageMapSet(props.paths.path)
  }, [])

  useEffect(() => {
    listUpdate(listData?.data || [], listData?.focusId)
  }, [listData])

  useEffect(() => {
    if (status === 'authenticated') {
      const { user } = data
      if (user) {
        for (const [key, value] of Object.entries(user)) {
          userSet(key, value as string)
        }
      }
    }
  }, [data, status])

  if (isError) {
    return <div>Error</div>
  }

  if (status === 'loading' || isLoading) {
    return (
      <div style={{ height: '100vh' }}>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        {/* <title>{title}</title> */}
        <meta name="description" content="Creation App" />
        <link
        // rel="icon"
        // href={emoji ? transferEmojiToSvg(emoji) : '/favicon.ico'}
        />
      </Head>
      <DashboardLayout list={list}>{/* <DashboardMain /> */}</DashboardLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<DashboardProp>
> => {
  const data = await fetch(`${URL}/api/getImageCover`)
  const paths = await data.json()

  return {
    props: {
      paths,
    },
  }
}

export default Dashboard
