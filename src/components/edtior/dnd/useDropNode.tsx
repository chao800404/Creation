import { PlateEditor, TElement, Value } from '@udecode/plate'
import { DragItemNode } from '@udecode/plate-ui-dnd'
import React from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { SourceType } from 'dnd-core'

type DropProps = {
  sourceType: SourceType
}

type DropFn = (
  item: TElement,
  monitor: DropTargetMonitor<TElement, unknown>
) => void

export const useDropNode = ({ sourceType }: DropProps, dropFn: DropFn) => {
  const [{ isOver, draggingItem, canDrop }, drop] = useDrop<
    TElement,
    unknown,
    { isOver: boolean; draggingItem: string | symbol | null; canDrop: boolean }
  >({
    accept: sourceType,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggingItem: monitor.getItemType(),
    }),
    drop(item, monitor) {
      dropFn(item, monitor)
    },
  })

  return {
    drop,
    isOver,
    draggingItem,
    canDrop,
  }
}
