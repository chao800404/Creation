import React, { useRef } from 'react'
import DashboardBanner from '../banner/dashboardBanner'

import { DashboardMainWrapper } from './main.styles'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import Spinner from '../spinner/spinner'
import HeaderEditorS from '../edit/headerEditorS'

const DashboardMain = () => {
  const {
    query: { page },
  } = useRouter()

  const {
    data: { cover },
    isLoading,
  } = usePageSWR(page as string)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <DashboardMainWrapper show={(cover && cover.length > 0) || false}>
      <div className="DashboardMain_container">
        <div className="DashboardMain_container-banner">
          {cover && cover.length > 0 && <DashboardBanner coverImage={cover} />}
        </div>
        <div className="DashboardMain_container-content">
          <div className="DashboardMain_container-content-gap" />
          <div className="DashboardMain_container-content-header">
            <HeaderEditorS />
          </div>
          <div
            style={{
              height: '200vh',
              background: '#c3c3c3',
            }}
          ></div>
          <div style={{ height: '20vh', background: '#ffffff' }}></div>
        </div>

        {/* {title === null && <InitialContainer />} */}
      </div>
    </DashboardMainWrapper>
  )
}

export default DashboardMain
