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
import { useListSWR } from '../../hook/useListSWR'
import { useRouter } from 'next/router'

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
}

const { searchBarBtn, interfaces, workspaces, importFile, trash, newPage } =
  SIDE_OPTION

const DashboardLayout: React.FC<DashboardLayoutType> = ({ children }) => {
  const { page } = useRouter().query
  const id = (page && (page[0] as string)) || ''
  const {
    data: { list },
  } = useListSWR(id)
  return (
    <DashboardLayoutWrapper>
      <DynamicSideWrapper>
        <div>
          <SearchBarBtn desc={searchBarBtn.text} />
          <div className="dashboard_side-feature">
            {list && (
              <FavoriteTag list={list?.filter((item) => item.favorite)} />
            )}
            <Accordion text={interfaces.text} />
          </div>

          <div className="dashboard_side_controller">
            <WorkspaceControl text={workspaces.text} />
          </div>
        </div>

        {list && <SideContainer list={list} height="100%" />}

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
