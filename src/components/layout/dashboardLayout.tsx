import React, { useCallback, useEffect } from 'react'

import SearchBarBtn from '../button/searchBar-button'
import Accordion from '../accordion/accordion'
import WorkspaceControl from '../control/workspaceControl'
import FeaturesBtn from '../button/featuresBtn'
import { SIDE_OPTION } from '../../utils/config'
import { DashboardLayoutWrapper } from './dashboard.styles'
import { ResDataType, useListSWR } from '../../hook/useListSWR'
import { IoTrashOutline } from 'react-icons/io5'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { hiddenMenuPopup } from '../../../src/components/popup/menuPopup'
import { HandleRename } from '../drop/treeView/type'
import DashBoardContainer from '../container/dashBoardContainer'
import SideWrapper from '../side/sideWrapper'
import router from 'next/router'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getBackendOptions } from '@minoru/react-dnd-treeview'
import { TreeView, FavoriteTag } from '../drop'
import { MenuType } from './dashboard'

// const DynamicSideWrapper = dynamic(() => import('../side/sideWrapper'), {
//   ssr: false,
// })

// const DynamicDashBoardContainer = dynamic(
//   () => import('../container/dashBoardContainer'),
//   {
//     ssr: false,
//   }
// )

type DashboardLayoutType = {
  children: JSX.Element | JSX.Element[]
}

const { searchBarBtn, interfaces, workspaces, importFile, trash, newPage } =
  SIDE_OPTION

const DashboardLayout: React.FC<DashboardLayoutType> = ({ children }) => {
  const { page } = router.query
  const id = (page && (page[0] as string)) || ''

  const {
    data: { list },
    mutateFunction,
  } = useListSWR(id)

  const menuMap: MenuType<ResDataType, HandleRename> = useCallback(
    (node, renameFn) => [
      {
        icon: IoTrashOutline,
        desc: 'Delete',
        onClick: () => {
          mutateFunction.deletePage(node.id as string)
          hiddenMenuPopup()
        },
      },
      {
        icon: node.data?.favorite ? AiFillStar : AiOutlineStar,
        desc: node.data?.favorite ? 'Unfavorite' : 'Favorite',
        onClick: () => {
          mutateFunction.updatePageConfig(
            node.id as string,
            'favorite',
            !node.data?.favorite
          )
          hiddenMenuPopup()
        },
      },
      {
        icon: MdOutlineDriveFileRenameOutline,
        desc: 'Rename',
        onClick: () => {
          renameFn()
          hiddenMenuPopup()
        },
      },
    ],
    [mutateFunction]
  )

  if (!list) return null

  return (
    <DndProvider
      backend={HTML5Backend}
      context={window}
      options={getBackendOptions()}
    >
      <DashboardLayoutWrapper>
        <SideWrapper>
          <SearchBarBtn desc={searchBarBtn.text} />
          <div className="dashboard_side-feature">
            {list && (
              <FavoriteTag
                list={list}
                id={id}
                menuMap={menuMap}
                updateFavorite={(id) =>
                  mutateFunction.updatePageConfig(id, 'favorite', true)
                }
              />
            )}

            <div className="caption">
              <Accordion text={interfaces.text} />
            </div>
          </div>

          <div className="dashboard_side-controller">
            <WorkspaceControl text={workspaces.text} />
          </div>
          <div className="dashboard_side-container">
            {list && <TreeView list={list} id={id} menuMap={menuMap} />}
          </div>

          <div className="dashboard_side-option">
            <FeaturesBtn icon={importFile.icon} text={importFile.text} />
            <FeaturesBtn icon={trash.icon} text={trash.text} />
            <FeaturesBtn icon={newPage.icon} text={newPage.text} />
          </div>
        </SideWrapper>

        <DashBoardContainer id={id} list={list}>
          {children}
        </DashBoardContainer>
      </DashboardLayoutWrapper>
    </DndProvider>
  )
}

export default React.memo(DashboardLayout)
