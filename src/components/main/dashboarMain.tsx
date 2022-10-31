import React, { useRef, useState, useEffect } from 'react'
import DashboardBanner from '../banner/dashboardBanner'
import { usePageStore } from '../../store'
import shallow from 'zustand/shallow'

import BoundLine from '../line/boundLine'
import { useLayoutControllerStore } from '../../store'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import { DashboardMainWrapper } from './main.styles'
import HeaderEditor from '../edit/headerEditor'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import { fetcher } from '../../utils/fetch'

const DashboardMain = () => {
  const popupIconElem = useRef(null)

  const {
    query: { page },
  } = useRouter()

  const {
    data: { cover },
  } = usePageSWR(page as string)

  // const uploadEmojiWrapper = (path: string) => {
  //   uploadEmoji(path)
  //   setToggleIcon(false)
  // }

  // const toggle = useStore((state) => state.toggleChangeCoverPopup, shallow)

  // const handlePointerEvent = () => {
  //   if (!toggle) setHovered()
  // }

  // const handleOnClickEmoji = (e: React.MouseEvent) => {
  //   const target = (e.target as HTMLDivElement).closest(
  //     '.emoji'
  //   ) as HTMLDivElement
  //   const emoji = target?.dataset?.emoji
  //   if (emoji) {
  //     uploadEmoji(emoji)
  //     setToggleIcon(false)
  //   }
  // }

  // const emojiExist = useCallback(() => {
  //   return emoji && !(emoji?.length === 0)
  // }, [emoji])

  // useWindowCancelState((e) => {
  //   const target = (e.target as HTMLDivElement).closest('.icon_container')
  //   if (target && emojiExist()) {
  //     return setToggleIcon(true)
  //   }
  //   setToggleIcon(false)
  // })

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
