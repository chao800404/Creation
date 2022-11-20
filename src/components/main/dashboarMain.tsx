// import DashboardBanner from '../banner/dashboardBanner'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import HeaderEditorS from '../edit/headerEditorS'
import Spinner from '../spinner/spinner'
import { DashboardMainWrapper } from './main.styles'
import BlockInputContent from '../input/blockInputContent'
import dynamic from 'next/dynamic'
import React, { Suspense, useEffect, useRef } from 'react'
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
  const elemRef = useRef<HTMLDivElement | null>(null)

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const focusBlock = document.activeElement
    if (elemRef.current?.children && focusBlock) {
      const childrenNode: React.ReactNode[] = [
        ...elemRef.current?.children,
      ].map((node) => node.id)

      const { id } = focusBlock.closest(
        '[data-type="block-content"]'
      ) as HTMLInputElement

      const index = childrenNode.indexOf(id)

      const curElemeFocusPos = window.getSelection()?.focusOffset
      const focusContentLength = focusBlock.lastChild?.textContent?.length

      const selectElem = (index: number) => {
        const elemNext = elemRef.current?.querySelector(
          `#${childrenNode[index]}`
        ) as HTMLInputElement
        elemNext && elemNext.focus()
      }
      if (curElemeFocusPos !== focusContentLength) return
      switch (e.key) {
        case 'ArrowDown':
          selectElem(index + 1)
          break
        case 'ArrowUp':
          selectElem(index - 1)
        default:
          return
      }
    }
  }

  if (isLoading && !blocksContent) {
    return <Spinner />
  }

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
          <div className="DashboardMain_container-content-gap" />
          <div className="DashboardMain_container-content-header pl_m pr_m">
            <HeaderEditorS />
          </div>
          <div
            className="DashboardMain_container-content-add"
            onKeyDown={handleOnKeyDown}
            ref={elemRef}
          >
            {blocksContent &&
              blocksContent.map((block, index) => (
                <BlockInputContent
                  blockData={block}
                  key={block?.id}
                  pageId={id}
                  blockIndex={index}
                  bigThenOne={blocksContent.length > 1}
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
