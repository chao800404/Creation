import React, { useCallback } from 'react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { ResDataType } from '../../../hook/useListSWR'
import { LabelItemWrapper } from './lableItemWrapper'
import { LaybelContainerWrapper } from './label.styles'
import { LabelType, DragItem } from './type'
import { ItemTypes as TreeType } from '@minoru/react-dnd-treeview'
import { ItemTypes } from '../itemTypes'
import { useRouter } from 'next/router'

const LabelContainer = ({
  list,
  id,
  removeLabel,
  setLabels,
  labels,
  addLabel,
}: LabelType<ResDataType>['list']) => {
  const router = useRouter()
  const accept = [ItemTypes.Label, TreeType.TREE_ITEM]
  const [{ isOver, draggingItem, canDrop }, drop] = useDrop(() => ({
    accept,
    drop(_item: DragItem<ResDataType>, monitor) {
      if (_item.id) {
        const dragItem = list.find((item) => item.id === _item.id)
        !!dragItem && addLabel(dragItem)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggingItem: monitor.getItemType(),
    }),
  }))

  const moveLabel = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setLabels(
        update(labels, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, labels[dragIndex]],
          ],
        })
      )
    },
    [labels, setLabels]
  )

  const insertLabel = useCallback(
    (dragItem: ResDataType, dragIndex: number, hoverIndex: number) => {
      const existLabelIndex = labels.findIndex(
        (item) => item.id === dragItem.id
      )
      if (existLabelIndex === -1) {
        setLabels(
          update(labels, {
            $splice: [[hoverIndex, 0, dragItem]],
          })
        )
      } else {
        setLabels(
          update(labels, {
            $splice: [
              [hoverIndex, 1],
              [hoverIndex, 0, dragItem],
              [existLabelIndex, 1, labels[hoverIndex]],
            ],
          })
        )
      }
      setTimeout(() => router.push(`/dashboard/${dragItem.id}`), 100)
    },
    [labels, setLabels, router]
  )

  const renderLabel = useCallback(
    (item: ResDataType, index: number) => {
      return (
        <LabelItemWrapper
          key={item.id}
          index={index}
          moveLabel={moveLabel}
          label={item}
          isSelected={item.id === id}
          hasChild={list.some((label) => label.parent === item.id)}
          removeLabel={removeLabel}
          insertLabel={insertLabel}
          labels={labels}
        />
      )
    },
    [id, labels, list, moveLabel, removeLabel, insertLabel]
  )

  const isActive =
    canDrop && isOver && draggingItem && accept.includes(draggingItem)

  return (
    <>
      <LaybelContainerWrapper
        isActive={!!isActive}
        ref={drop}
        role="labelContainer"
      >
        {labels.map((label, i) => renderLabel(label, i))}
      </LaybelContainerWrapper>
    </>
  )
}

export default LabelContainer
