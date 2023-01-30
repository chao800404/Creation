import type { Identifier } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import LabelItem from './labelItem'
import { LabelType, DragItem } from './type'
import { ItemTypes } from '../itemTypes'
import { ResDataType } from '../../../hook/useListSWR'
import { ItemTypes as TreeType } from '@minoru/react-dnd-treeview'

export const LabelItemWrapper: FC<LabelType<ResDataType>['item']> = ({
  label,
  index,
  moveLabel,
  hasChild,
  isSelected,
  labels,
  removeLabel,
  insertLabel,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const accept = [ItemTypes.Label, TreeType.TREE_ITEM]
  const [{ handlerId }, drop] = useDrop<
    DragItem<ResDataType>,
    void,
    { handlerId: Identifier | null }
  >({
    accept,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    drop(item: DragItem<ResDataType>, monitor) {
      if (ref.current) {
        const dragIndex = item.index
        const hoverIndex = index

        const draggingItem = monitor.getItemType()

        switch (draggingItem) {
          case ItemTypes.Label:
            if (dragIndex !== hoverIndex) {
              moveLabel(dragIndex, hoverIndex)
              item.index = hoverIndex
            }
            break
          case TreeType.TREE_ITEM:
            const { ref, ..._item } = monitor.getItem()
            insertLabel(_item, dragIndex, hoverIndex)
            break
        }
      }
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Label,
    item: () => {
      return { id: label.id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div ref={ref} data-handler-id={handlerId}>
      <LabelItem
        {...label}
        hasChild={hasChild}
        isSelected={isSelected}
        labels={labels}
        removeLabel={removeLabel}
      />
    </div>
  )
}
