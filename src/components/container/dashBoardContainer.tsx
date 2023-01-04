import React, { ReactNode, useEffect, useRef, useState } from 'react'
import DashBoardNav from '../navbar/dashBoardNav'
import shallow from 'zustand/shallow'
import { usePageControllerStore } from '../../store'
import { DashboardContainerWrapper } from './container.styles'
import BoundLine from '../line/boundLine'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import BlockReviewContainer from '../container/blockReviewContainer'
import DashboardFooter from '../footer/dashboardFooter'
import { useLabelStore, addLabel } from '../../store/useLabelStore'
import { LabelContainer } from '../drop'
import { ResDataType } from '../../hook/useListSWR'

const DashBoardContainr = ({
  children,
  id,
  list,
}: {
  children: ReactNode
  id: string
  list: ResDataType[]
}) => {
  const sideWidth = usePageControllerStore((state) => state.sideWidth, shallow)
  const [originWidth, setOriginWidth] = useState(0)
  const dashboardMainElem = useRef<HTMLDivElement | null>(null)
  const { dashboardMainWidth, dashboardMainWidthSet, dragStart } =
    usePageControllerStore(
      (state) => ({
        dashboardMainWidth: state.dashboardMainWidth,
        dashboardMainWidthSet: state.dashboardMainWidthSet,
        dragStart: state.dragStart,
      }),
      shallow
    )
  const { removeLabel, labels, setLabels } = useLabelStore(
    (state) => ({
      removeLabel: state.removeLabel,
      labels: state.labels,
      setLabels: state.setLabels,
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
    <DashboardContainerWrapper style={{ width: `calc(100% - ${sideWidth}px)` }}>
      <div className="dashboard_nav">
        <DashBoardNav />
      </div>
      <div className="dashboardContainer_container">
        <div className="dashboardContainer_container-left">
          <BlockReviewContainer />
        </div>
        <div
          className="dashboardContainer_main"
          style={{ width: `${dashboardMainWidth}px` }}
          ref={dashboardMainElem}
        >
          {labels && labels.length > 0 && (
            <div className="dashboardContainer_label">
              <LabelContainer
                id={id}
                list={list}
                labels={labels}
                setLabels={setLabels}
                removeLabel={removeLabel}
                addLabel={addLabel}
              />
            </div>
          )}

          <WrapperScrollbar>{children}</WrapperScrollbar>
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

      <footer className="dashboard_footer">
        <DashboardFooter />
      </footer>
    </DashboardContainerWrapper>
  )
}

export default React.memo(DashBoardContainr)
