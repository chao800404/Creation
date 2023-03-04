import React from 'react'
import { ItemTypes } from '../itemTypes'
import { ItemTypes as TreeType } from '@minoru/react-dnd-treeview'
import { useDrop } from 'react-dnd'
import { DragItem } from '../label/type'
import { MainDropWrapperType } from './type'
import { useRouter } from 'next/router'
import { MainWrapper } from './main.styles'
import { addLabel } from '../../../store/useLabelStore'
import { ResDataType } from '../../../hook/useListSWR'

const MainDropWrapper: React.FC<MainDropWrapperType> = ({ children }) => {
  const accept = [ItemTypes.Label, TreeType.TREE_ITEM]
  const router = useRouter()
  const [{ isOver, draggingItem, canDrop }, drop] = useDrop(() => ({
    accept,
    drop(_item: DragItem<ResDataType>, monitor) {
      router.push(`dashboard/${_item.id}`)
      const { ref, ...item } = _item
      addLabel(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggingItem: monitor.getItemType(),
    }),
  }))

  const isActive =
    canDrop && isOver && draggingItem && accept.includes(draggingItem)

  return (
    <MainWrapper
      isActive={!!isActive}
      style={{ height: '100%' }}
      ref={drop}
      role="dashboardMain"
    >
      {children}
    </MainWrapper>
  )
}

export default React.memo(MainDropWrapper)
