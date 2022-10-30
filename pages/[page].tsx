import React, { useEffect } from 'react'
import useSWR, { SWRConfig, useSWRConfig } from 'swr'
import shallow from 'zustand/shallow'
import { DashboardLayout, DashboardMain } from '../src/components'
import { usePageStore } from '../src/store'
import { List, PrismaClient } from '@prisma/client'
import { GetStaticProps, NextPage } from 'next'
import { useFetch } from '../src/hook/useFetch'
import { fetcher } from '../src/utils/fetch'

const DashboardPage: NextPage = () => {
  const coverImageMapSet = usePageStore(
    (state) => state.coverImageMapSet,
    shallow
  )

  const { data, isLoading, isError } = useFetch<List[]>()
  const { data: coverImagePath } = useSWR('api/getImageCover', fetcher)

  useEffect(() => {
    coverImageMapSet(coverImagePath?.path)
  }, [coverImagePath, coverImageMapSet])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const { data: listData, status } = data

  if (status === 'fail') {
    return <div>Somthing Error...</div>
  }

  return (
    <SWRConfig>
      <DashboardLayout list={listData}>
        <DashboardMain />
      </DashboardLayout>
    </SWRConfig>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

export const getStaticPaths = async () => {
  const prisma = new PrismaClient()
  const list = (await prisma.list.findMany()) as List[]
  return {
    paths: list?.map((listItem) => ({ params: { page: listItem.id } })),
    fallback: true,
  }
}

export default DashboardPage
