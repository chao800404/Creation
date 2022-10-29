import React, { ReactNode, useEffect } from 'react'
import DashBoardNav from '../navbar/dashBoardNav'
import shallow from 'zustand/shallow'
import { useLayoutControllerStore, usePageStore } from '../../store'
import { DashboardContainerWrapper } from './container.styles'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetch'
import Loading from '../loading/loading'
import { useRouter } from 'next/router'

const DashBoardContainr = ({ children }: { children: ReactNode }) => {
  const sideWidth = useLayoutControllerStore(
    (state) => state.sideWidth,
    shallow
  )

  const {
    query: { page },
  } = useRouter()

  const { imageSet, loading, list } = usePageStore(
    (state) => ({
      imageSet: state.imageSet,
      loading: state.loading,
      list: state.list,
    }),
    shallow
  )

  const { data } = useSWR(
    page && list.length > 0 ? `/api/page/${page}` : null,
    fetcher
  )

  useEffect(() => {
    imageSet(data?.data?.cover?.image)
  }, [data, imageSet])

  return (
    <DashboardContainerWrapper
      style={{ width: `calc(100% - ${sideWidth}px )` }}
    >
      <div className="dashboard_nav">
        <DashBoardNav />
      </div>
      {true ? (
        <div className="dashboardContainer_container">
          <div className="dashboardContainer_container-left">
            <div>jewofw</div>
          </div>
          {children}
          <div className="dashboardContainer_container-right">
            <div>jewofw</div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <div className="dashboard_footer">Footer</div>
    </DashboardContainerWrapper>
  )
}

export default React.memo(DashBoardContainr)
