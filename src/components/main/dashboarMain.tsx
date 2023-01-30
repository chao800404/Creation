// import DashboardBanner from '../banner/dashboardBanner'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import HeaderEditorS from '../edit/headerEditorS'
import { DashboardMainWrapper } from './main.styles'
import dynamic from 'next/dynamic'
import React, { Suspense, useEffect, useRef } from 'react'
const DynamicDashboardBanner = dynamic(
  () => import('../banner/dashboardBanner'),
  {
    suspense: true,
  }
)

const Editor = dynamic(() => import('../edtiors'), { ssr: false })

const DashboardMain = () => {
  const router = useRouter()
  const {
    query: { page },
  } = router

  const id = (page && (page[0] as string)) || ''
  // const [changeRouter, setChangeRouter] = useState(false)
  const {
    data: { cover, blocks, blockToOrder },
    isLoading,
  } = usePageSWR(id)

  return (
    <DashboardMainWrapper
      tabIndex={0}
      show={(cover && cover.length > 0) || false}
      hasCover={!!cover}
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
          <HeaderEditorS />
          <Editor />
        </div>
      </div>
    </DashboardMainWrapper>
  )
}

export default React.memo(DashboardMain)
