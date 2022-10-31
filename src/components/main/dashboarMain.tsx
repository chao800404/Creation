import React, { useRef } from 'react'
import DashboardBanner from '../banner/dashboardBanner'

import WrapperScrollbar from '../scroll/wrapperScrollbar'
import { DashboardMainWrapper } from './main.styles'
import HeaderEditor from '../edit/headerEditor'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'

const DashboardMain = () => {
  const popupIconElem = useRef(null)

  const {
    query: { page },
  } = useRouter()

  const {
    data: { cover },
    isLoading,
  } = usePageSWR(page as string)

  if (isLoading) {
    return <div>Loading </div>
  }

  return (
    <DashboardMainWrapper show={(cover && cover.length > 0) || false}>
      <WrapperScrollbar>
        <div className="DashboardMain_container">
          <div className="DashboardMain_container-banner">
            {cover && cover.length > 0 && (
              <DashboardBanner coverImage={cover} />
            )}
          </div>
          <div className="DashboardMain_container-content">
            <div
              style={{
                width: '5rem',
                height: '5rem',
                position: 'relative',
                zIndex: 2000,
                transform: 'translateY(-2.8rem)',
              }}
              ref={popupIconElem}
              className="icon_container"
            >
              {/* {emoji?.length > 0 && ( */}
              <>
                {/* {emoji && emoji.toString().startsWith('blob') ? (
                  <Image
                    src={emoji}
                    layout="fill"
                    alt="icon"
                    objectFit="cover"
                  />
                ) : (
                  <Box fontSize="4rem">{emoji}</Box>
                )} */}
              </>
            </div>
          </div>
          <HeaderEditor />
          {/* {title === null && <InitialContainer />} */}
        </div>
      </WrapperScrollbar>
    </DashboardMainWrapper>
  )
}

export default DashboardMain
