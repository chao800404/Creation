import Link from 'next/link'
import React, { useState } from 'react'
import { TypeIcon } from '../drop/treeView/typeIcon'
import { WorkspaceItemWrapper } from './item.styles'
import { ResDataType } from '../../hook/useListSWR'
import { MdDragIndicator } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import { MenuMapType } from '../drop/treeView/type'
import { showMenuPopup } from '../popup/menuPopup'
import useWindowPointerToggle from '../../utils/useWindowPointerToggle'
import { useMenuPopupStore } from '../../store/useMenuPopupStore'
import WrapperRename from '../wrapper/wrapperRename'
import { addLabel } from '../../store/useLabelStore'
import shallow from 'zustand/shallow'

const WorkspaceItem: React.FC<
  ResDataType & {
    isSelected: boolean
    hasChild: boolean
    dataType: string
    addNewPage: (parentId: string) => void
    menuMap: MenuMapType
    updatePageConfig: (
      id: string,
      key: 'title' | 'favorite' | 'editable' | 'shouldShow',
      value: string | boolean
    ) => void
  }
> = (props) => {
  const {
    dataType,
    hasChild,
    addNewPage,
    isSelected,
    menuMap,
    updatePageConfig,
    ...node
  } = props

  const [nextText, setNextText] = useState(node.text)

  const updateText = () => {
    if (nextText?.length > 0 && node?.text !== nextText) {
      updatePageConfig(node.id as string, 'title', nextText)
      setNextText('')
      handleToggleSet(false)
    }
  }

  const { toggle, handleToggleSet } = useWindowPointerToggle(
    'tree-node',
    (target) => {
      const show = useMenuPopupStore.getState().show
      if (!target || (target.id !== node.id && show)) updateText()
    }
  )

  return (
    <WorkspaceItemWrapper
      isSelected={props.isSelected}
      onPointerDown={(e) => {
        if (e.buttons === 1) addLabel(node)
        if (e.buttons === 2) {
          const x = e.pageX
          const y = e.pageY
          const buttonsMap = menuMap(node, () => handleToggleSet(true))
          showMenuPopup({ x, y, dataType, buttonsMap, width: 7.5 })
        }
      }}
      data-type={dataType}
    >
      <Link href={`dashboard/${props.id}`}>
        <a className="root">
          <div className="workspace-item-icon">
            <TypeIcon isOpen={false} hasChild={hasChild} node={node} />
          </div>
          <WrapperRename
            text={node.text && node.text.length > 0 ? node.text : 'Untitled'}
            onChange={(e) => setNextText(e.target.value)}
            onKeyDown={(e) => {
              e.key === 'Enter' && updateText()
            }}
            showInput={toggle}
          />
        </a>
      </Link>
      <div
        className="add-page-icon"
        onClick={(e) => {
          e.preventDefault()
          addNewPage(node.id as string)
        }}
      >
        <AiOutlinePlus />
      </div>
    </WorkspaceItemWrapper>
  )
}

export default React.memo(WorkspaceItem)
