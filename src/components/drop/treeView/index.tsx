import React from 'react'
import { Tree, DropOptions } from '@minoru/react-dnd-treeview'
import { CustomNode } from './customNode'
import { CustomDragPreview } from './customDragPreview'
import { TreeViewWrapper } from './treeView.styles'
import styles from './treeView.module.css'
import { TreeViewType, ShowMenuProps } from './type'
import { useListSWR } from '../../../hook/useListSWR'
import { showMenuPopup } from '../../popup/menuPopup'

const TreeView: React.FC<TreeViewType> = ({ list, id, menuMap }) => {
  const {
    mutateFunction: { addNewPage, reorderPage, updatePageConfig },
  } = useListSWR()

  const handleNewPage = (parent: string) => addNewPage(parent)

  const handleDrop = (
    newTree: typeof list,
    { dragSourceId, dropTargetId }: DropOptions
  ) => reorderPage(newTree, dragSourceId as string, dropTargetId as string)

  const handleShowMenu = (props: ShowMenuProps) => {
    if (props && menuMap) {
      const { x, y, dataType, node, handleRename } = props
      const buttonsMap = menuMap(node, handleRename)
      showMenuPopup({
        x,
        y,
        dataType,
        buttonsMap,
        width: 7.5,
      })
    }
  }

  const openTreeId = list
    .filter((item) => item.data?.shouldShow)
    .map((item) => item.id)

  return (
    <TreeViewWrapper
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
    >
      <Tree
        tree={list}
        rootId={0}
        sort={false}
        render={(node, options) => (
          <CustomNode
            testIdPrefix={''}
            handleRef={null}
            node={node}
            isSelected={node.id === id}
            addNewPage={handleNewPage}
            updatePageConfig={updatePageConfig}
            showMenu={handleShowMenu}
            {...options}
          />
        )}
        dragPreviewRender={(monitorProps) => (
          <CustomDragPreview monitorProps={monitorProps} tree={list} />
        )}
        onDrop={handleDrop}
        classes={{
          root: styles.treeRoot,
          draggingSource: styles.draggingSource,
          placeholder: styles.placeholderContainer,
          dropTarget: styles.dropTarget,
          container: styles.listContainer,
        }}
        initialOpen={openTreeId}
      />
    </TreeViewWrapper>
  )
}

export default TreeView
