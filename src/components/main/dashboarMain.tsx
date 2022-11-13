// import DashboardBanner from '../banner/dashboardBanner'
import Router, { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import HeaderEditorS from '../edit/headerEditorS'
import Spinner from '../spinner/spinner'
import { DashboardMainWrapper } from './main.styles'
import BlockInputContent from '../input/blockInputContent'
import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'

const DynamicDashboardBanner = dynamic(
  () => import('../banner/dashboardBanner'),
  {
    suspense: true,
  }
)

const DashboardMain = () => {
  const router = useRouter()
  const {
    query: { page },
  } = router

  const id = (page && (page[0] as string)) || ''

  const {
    data: { cover, blocks },
    isLoading,
  } = usePageSWR(id)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <DashboardMainWrapper
      tabIndex={1}
      show={(cover && cover.length > 0) || false}
    >
      <div className="DashboardMain_container">
        <div className="DashboardMain_container-banner">
          {cover && cover.length > 0 && (
            <Suspense fallback={`Loading...`}>
              <DynamicDashboardBanner coverImage={cover} />
            </Suspense>
          )}
        </div>
        <div className="DashboardMain_container-content">
          <div className="DashboardMain_container-content-gap" />
          <div className="DashboardMain_container-content-header">
            <HeaderEditorS />
          </div>
          <div className="DashboardMain_container-content-add">
            {blocks && blocks?.length > 0 ? (
              blocks.map((block) => (
                <BlockInputContent blockData={block} key={block.id} />
              ))
            ) : (
              <BlockInputContent />
            )}
          </div>

          <div style={{ height: '50vh', background: '#ffffff' }}></div>
        </div>

        {/* {title === null && <InitialContainer />} */}
      </div>
    </DashboardMainWrapper>
  )
}

export default DashboardMain
