import React from 'react'

import SearchBarBtn from '../button/searchBar-button'
import FavoriteTag from '../tag/favoriteTag'
import Accordion from '../accordion/accordion'
import WorkspaceControl from '../control/workspaceControl'
import SideContainer from '../container/sideContainer'
import FeaturesBtn from '../button/featuresBtn'

import { SIDE_OPTION } from '../../utils/config'
import { DashboardLayoutWrapper } from './dashboard.styles'
import dynamic from 'next/dynamic'

import { List } from '@prisma/client'

const DynamicSideWrapper = dynamic(() => import('../side/sideWrapper'), {
  ssr: false,
})

const DynamicDashBoardContainer = dynamic(
  () => import('../container/dashBoardContainer'),
  {
    ssr: false,
  }
)

type DashboardLayoutType = {
  children: JSX.Element | JSX.Element[]
  list: List[]
}

const { searchBarBtn, interfaces, workspaces, importFile, trash, newPage } =
  SIDE_OPTION

const DashboardLayout: React.FC<DashboardLayoutType> = ({ children, list }) => {
  return (
    <DashboardLayoutWrapper>
      <DynamicSideWrapper>
        <div>
          <SearchBarBtn desc={searchBarBtn.text} />
          <div className="dashboard_side-feature">
            <FavoriteTag list={list?.filter((item) => item.favorite)} />
            <Accordion text={interfaces.text} />
          </div>

          <div className="dashboard_side_controller">
            <WorkspaceControl text={workspaces.text} />
          </div>
        </div>

        <SideContainer list={list} height="100%" />

        <div className="dashboard_side-option">
          <FeaturesBtn icon={importFile.icon} text={importFile.text} />
          <FeaturesBtn icon={trash.icon} text={trash.text} />
          <FeaturesBtn icon={newPage.icon} text={newPage.text} />
        </div>
      </DynamicSideWrapper>
      <DynamicDashBoardContainer>{children}</DynamicDashBoardContainer>
    </DashboardLayoutWrapper>
  )
}

export default DashboardLayout
