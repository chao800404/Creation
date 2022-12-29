import React from 'react'
import { DragPreviewWrapper } from './treeView.styles'
import { TypeIcon } from './typeIcon'
import { DragPreviewProp, TreeDataType } from './type'
import { ListData } from '../../../hook/useListSWR'

export const CustomDragPreview: React.FC<DragPreviewProp> = (props) => {
  const item = props.monitorProps.item as TreeDataType<ListData>
  const hasChild = props.tree.some((l) => l.parent == item.id)

  return (
    <DragPreviewWrapper>
      <TypeIcon isOpen={false} hasChild={hasChild} node={item} />
      <p>{item.text && item.text.length > 0 ? item.text : 'Untitled'}</p>
    </DragPreviewWrapper>
  )
}
