import React from 'react'
import useSWR from 'swr'
import shallow from 'zustand/shallow'
import { DashboardLayout, DashboardMain } from '../src/components'
import { usePageStore } from '../src/store'

const DashboardPage = () => {
  const { imageSet, loading, list } = usePageStore(
    (state) => ({
      imageSet: state.imageSet,
      loading: state.loading,
      list: state.list,
    }),
    shallow
  )

  return (
    <DashboardLayout list={list}>
      <DashboardMain />
    </DashboardLayout>
  )
}

export default DashboardPage
