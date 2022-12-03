import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useOnClickOutside from '../../utils/useOnClickOutside'

import SearchBarBtn from '../button/searchBar-button'
import FavoriteTag from '../tag/favoriteTag'
import Accordion from '../accordion/accordion'
import WorkspaceControl from '../control/workspaceControl'
import SideContainer from '../container/sideContainer'
import FeaturesBtn from '../button/featuresBtn'
import { SIDE_OPTION } from '../../utils/config'
import { DashboardLayoutWrapper } from './dashboard.styles'
import dynamic from 'next/dynamic'
import { ListDataType, useListSWR } from '../../hook/useListSWR'
import { useRouter } from 'next/router'
import { IoTrashOutline } from 'react-icons/io5'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import {
  showMenuPopup,
  hiddenMenuPopup,
} from '../../../src/components/popup/menuPopup'

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
  const router = useRouter()
  const { page } = router.query
  const id = (page && (page[0] as string)) || ''
  const {
    data: { list, favorite },
    mutateFunction,
  } = useListSWR(id)

  const findFavorite = (list: ListDataType[] | undefined, id: string) =>
    list?.find((item) => item.id === id)?.favorite

  const menuMap = useCallback(
    (id: string) => [
      {
        icon: IoTrashOutline,
        desc: 'Delete',
        onClick: () => {
          const index = list?.findIndex((item) => item.id === id)
          index && list
            ? router.push(`dashboard/${list[index - 1].id}`)
            : router.push('/')
          mutateFunction.deletePage(id as string)
          hiddenMenuPopup()
        },
      },
      {
        icon: findFavorite(list, id) ? AiFillStar : AiOutlineStar,
        desc: findFavorite(list, id) ? 'Unfavorite' : 'Favorite',
        onClick: () => {
          mutateFunction.updatePageItem(id, 'favorite', !findFavorite(list, id))
          hiddenMenuPopup()
        },
      },
      {
        icon: MdOutlineDriveFileRenameOutline,
        desc: 'Rename',
        onClick: () => {
          mutateFunction.updatePageItem(id, 'favorite', !favorite)
          hiddenMenuPopup()
        },
      },
    ],

    [favorite, list, mutateFunction, router]
  )

  // useOnClickOutside((e) => {
  //   const target = (e.target as HTMLElement).closest(
  //     '[data-type="workspace-item-container"]'
  //   )
  //   const popupBtn = (e.target as HTMLElement).closest(
  //     '[data-type="popup-btn"]'
  //   )

  //   if (target && e.button === 2) {
  //     console.log('run')
  //     return showMenuPopup({
  //       x: e.pageX,
  //       y: e.pageY,
  //       buttonsMap: menuMap(target.id),
  //       dataType: 'popup-btn',
  //     })
  //   }
  //   return hiddenMenuPopup()
  // })

  return (
    <DashboardLayoutWrapper>
      <DynamicSideWrapper
        onPointerDown={(e) => {
          const target = (e.target as HTMLElement).closest(
            '[data-type="workspace-item-container"]'
          )

          if (target && e.button === 2) {
            return showMenuPopup({
              x: e.pageX,
              y: e.pageY,
              buttonsMap: menuMap(target.id),
              dataType: 'workspace-item-container',
              width: 7.5,
            })
          }
        }}
      >
        <SearchBarBtn desc={searchBarBtn.text} />
        <div className="dashboard_side-feature">
          {list && (
            <FavoriteTag list={list?.filter((item) => item?.favorite)} />
          )}

          <div className="caption">
            <Accordion text={interfaces.text} />
          </div>
        </div>

        <div className="dashboard_side_controller">
          <WorkspaceControl text={workspaces.text} />
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
