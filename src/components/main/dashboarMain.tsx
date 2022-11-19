// import DashboardBanner from '../banner/dashboardBanner'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import HeaderEditorS from '../edit/headerEditorS'
import Spinner from '../spinner/spinner'
import { DashboardMainWrapper } from './main.styles'
import BlockInputContent from '../input/blockInputContent'
import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'
import { BlockInputType } from '../../types/block'
import { sortPageBlock } from '../../utils/sortPageBlock'
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
    data: { cover, blocks, blockToOrder },
    isLoading,
  } = usePageSWR(id)

  const blocksContent = sortPageBlock({ blocks, blockToOrder })

  if (isLoading && !blocksContent) {
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
          <div className="DashboardMain_container-content-header pl_m pr_m">
            <HeaderEditorS />
          </div>
          <div className="DashboardMain_container-content-add ">
            {blocksContent &&
              blocksContent.map((block, index) => (
                <BlockInputContent
                  blockData={block}
                  key={block?.id}
                  pageId={id}
                  blockIndex={index}
                  bigThenOne={blocksContent.length >= 1}
                />
              ))}
          </div>

          <div style={{ height: '50vh', background: '#ffffff' }}></div>
        </div>

        {/* {title === null && <InitialContainer />} */}
      </div>
    </DashboardMainWrapper>
  )
}

export default DashboardMain
