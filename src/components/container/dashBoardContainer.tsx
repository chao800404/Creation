import React, { ReactNode, useEffect, useRef, useState } from 'react'
import DashBoardNav from '../navbar/dashBoardNav'
import shallow from 'zustand/shallow'
import { useLayoutControllerStore, usePageStore } from '../../store'
import { DashboardContainerWrapper } from './container.styles'
import BoundLine from '../line/boundLine'

const DashBoardContainr = ({ children }: { children: ReactNode }) => {
  const sideWidth = useLayoutControllerStore(
    (state) => state.sideWidth,
    shallow
  )
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

  return (
    <DashboardContainerWrapper
      style={{ width: `calc(100% - ${sideWidth}px)`, marginLeft: '1rem' }}
    >
      <div className="dashboard_nav">
        <DashBoardNav />
      </div>

      <div className="dashboardContainer_container">
        <div className="dashboardContainer_container-left">
          <div>jewofw</div>
        </div>
        <div
          className="dashboardContainer_main"
          style={{ width: `${dashboardMainWidth}px` }}
          ref={dashboardMainElem}
        >
          {children}
          <BoundLine
            widthSet={dashboardMainWidthSet}
            left="-2px"
            height="100%"
            maxW={1200}
            minW={800}
            originWidth={originWidth}
            multiply={-2}
          />
          <BoundLine
            widthSet={dashboardMainWidthSet}
            right="-2px"
            height="100%"
            maxW={1200}
            minW={800}
            originWidth={originWidth}
            multiply={2}
          />
        </div>

        <div className="dashboardContainer_container-right">
          <div>jewofw</div>
        </div>
      </div>

      <div className="dashboard_footer">Footer</div>
    </DashboardContainerWrapper>
  )
}

export default React.memo(DashBoardContainr)
