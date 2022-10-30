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
import useSWR, { useSWRConfig, mutate } from 'swr'
import { fetcher } from '../../utils/fetch'

const DashboardMain = () => {
  const popupIconElem = useRef(null)
  const [originWidth, setOriginWidth] = useState(0)
  const dashboardMainElem = useRef<HTMLDivElement | null>(null)
  const { dashboardMainWidth, dashboardMainWidthSet, dragStart } =
    useLayoutControllerStore(
      (state) => ({
        dashboardMainWidth: state.dashboardMainWidth,
        dashboardMainWidthSet: state.dashboardMainWidthSet,
        dragStart: state.dragStart,
      }),
      shallow
    )

  useEffect(() => {
    if (dashboardMainElem && dashboardMainElem.current && dragStart) {
      const { width } = dashboardMainElem.current.getBoundingClientRect()
      setOriginWidth(width)
    }
  }, [dragStart])

  const {
    query: { page },
  } = useRouter()
  const { data } = useSWR(page ? `/api/page/${page}` : null, fetcher)

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

  console.log(data?.data.cover.image)

  return (
    <DashboardMainWrapper
      style={{ width: `${dashboardMainWidth}px` }}
      ref={dashboardMainElem}
      show={!!data && data?.data.cover.image.length > 0}
    >
      <WrapperScrollbar>
        <div className="DashboardMain_container">
          <div className="DashboardMain_container-banner">
            {data?.data.cover.image && data?.data.cover.image.length > 0 && (
              <DashboardBanner coverImage={data?.data.cover.image} />
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
            <div>
              {/* {hovered && cover && cover?.length > 0 && (
                  <ChangeController
                    pos="absolute"
                    bottom="1rem"
                    right="0"
                    bg="white"
                    fontSize="sm"
                    zIndex="300"
                    cursor="pointer"
                    w="fit-content"
                    data-type="change-cover-popup"
                    transform="translateY(-5rem)"
                    onPointerEnter={handlePointerEvent}
                    onPointerLeave={handlePointerEvent}
                  />
                )} */}
            </div>
          </div>
          {/* <HeaderEditor /> */}
          {/* {title === null && <InitialContainer />} */}
        </div>
      </WrapperScrollbar>
      <BoundLine
        widthSet={dashboardMainWidthSet}
        left="-2px"
        height="100%"
        maxW={1500}
        minW={800}
        originWidth={originWidth}
        multiply={-2}
      />
      <BoundLine
        widthSet={dashboardMainWidthSet}
        right="-2px"
        height="100%"
        maxW={1500}
        minW={800}
        originWidth={originWidth}
        multiply={2}
      />
    </DashboardMainWrapper>
  )
}

export default DashboardMain
