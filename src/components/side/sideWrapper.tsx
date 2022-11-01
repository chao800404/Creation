/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import shallow from 'zustand/shallow'
import { SIDE_MAX_WIDTH, SIDE_MIN_WIDTH } from '../../utils/config'
import BoundLine from '../line/boundLine'
import WorkspaceItemPopup from '../popup/workspaceItemPopup'
import { usePageControllerStore } from '../../store'
import { SideWrapperLayout } from './sideWrapper.styles'
export type PositionTypes = Record<string, number>

const SideWrapper = ({ children }: { children: React.ReactNode }) => {
  const [originWidth, setOriginWidth] = useState(0)
  const { sideWidth, sideWidthSet, dragStart } = usePageControllerStore(
    (state) => ({
      sideWidth: state.sideWidth,
      sideWidthSet: state.sideWidthSet,
      dragStart: state.dragStart,
    }),
    shallow
  )

  const elemRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (dragStart && elemRef && elemRef.current) {
      const { width } = elemRef.current.getBoundingClientRect()
      setOriginWidth(width)
    }
  }, [dragStart])

  return (
    <>
      <SideWrapperLayout
        style={{
          maxWidth: `${SIDE_MAX_WIDTH}px`,
          minWidth: `${SIDE_MIN_WIDTH}px`,
        }}
        width={sideWidth}
        ref={elemRef}
      >
        <div className="sideWrapperContainer">{children}</div>
        <BoundLine
          widthSet={sideWidthSet}
          right="-2px"
          height="97%"
          maxW={SIDE_MAX_WIDTH}
          minW={SIDE_MIN_WIDTH}
          originWidth={originWidth}
          multiply={1}
        />
      </SideWrapperLayout>

      <WorkspaceItemPopup focusNodeDom="workspace-item-container" />
    </>
  )
}

export default React.memo(SideWrapper)
