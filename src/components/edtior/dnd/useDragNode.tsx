import { PlateEditor, Value } from '@udecode/plate'
import { dndStore } from '@udecode/plate-ui-dnd'
import React from 'react'
import { useDrag } from 'react-dnd'
import { SourceType } from 'dnd-core'

type DragProps<T, V extends Value> = {
  editor: PlateEditor<V>
  item: T
  sourceType: SourceType
}

export const useDragNode = <T, V extends Value>({
  editor,
  item,
  sourceType,
}: DragProps<T, V>) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: sourceType,
    item: (monitor) => {
      dndStore.set.isDragging(true)
      editor.isDragging = true
      document.body.classList.add('dragging')

      return { ...item }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      dndStore.set.isDragging(false)
      editor.isDragging = false
      document.body.classList.remove('dragging')

      return false
    },
  })

  return {
    drag,
    preview,
  }
}
