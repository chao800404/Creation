import type { Identifier } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import LabelItem from './labelItem'
import { LabelType } from './type'
import { DragItem } from './type'
import { ItemTypes } from '../itemTypes'
import { ResDataType } from '../../../hook/useListSWR'

export const LabelItemWrapper: FC<LabelType<ResDataType>['item']> = ({
  label,
  index,
  moveLabel,
  hasChild,
  isSelected,
  labels,
  removeLabel,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.Label,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop(item: DragItem) {
      if (ref.current) {
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex !== hoverIndex) {
          moveLabel(dragIndex, hoverIndex)
          item.index = hoverIndex
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
