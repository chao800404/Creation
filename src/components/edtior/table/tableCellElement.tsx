import React, { useRef } from 'react'
import {
  findNodePath,
  getAboveNode,
  setPoint,
  Value,
} from '@udecode/plate-core'
import { getRootProps } from '@udecode/plate-styled-components'
import {
  ELEMENT_TD,
  getTableColumnIndex,
  setTableColSize,
} from '@udecode/plate-table'
import { HandleStyles, Resizable, ResizableProps } from 're-resizable'
import { useReadOnly } from 'slate-react'
import {
  TableCellElementProps,
  useIsCellSelected,
  useTableStore,
  focusEditor,
  getStartPoint,
} from '@udecode/plate'
import { TableCellWrapper } from './table.styles'
import { shallow } from 'zustand/shallow'

const TableCellElement = <V extends Value>(props: TableCellElementProps<V>) => {
  const {
    children,
    element,
    resizableProps,
    editor,
    ignoreReadOnly = false,
  } = props

  const readOnly = useReadOnly()
  const [hoveredColIndex, setHoveredColIndex] =
    useTableStore().use.hoveredColIndex()
  const setResizingCol = useTableStore().set.resizingCol()
  const resizeingCol = useTableStore().get.resizingCol()
  const path = findNodePath(editor, element)
  const elemRef = useRef<HTMLSpanElement>(null)
  const getFocusCell = getAboveNode(editor, { match: { type: ELEMENT_TD } })

  const isCellSelected = useIsCellSelected(element)

  const handleResize: HandleStyles | undefined =
    ignoreReadOnly || !readOnly
      ? {
          right: {
            top: 0,
            height: '100%',
            zIndex: 20,
            right: '-0.4rem',
          },
        }
      : undefined

  const colIndex = getTableColumnIndex(editor, { node: element })

  const onResize: ResizableProps['onResize'] = (e, direction, ref) => {
    setResizingCol({
      index: colIndex,
      width: ref.offsetWidth,
    })
  }

  const onResizeStop: ResizableProps['onResizeStop'] = (e, direction, ref) => {
    setTableColSize(
      editor,
      { colIndex, width: ref.offsetWidth },
      { at: findNodePath(editor, element) }
    )

    setResizingCol(null)
    setHoveredColIndex(null)
  }

  const match = getFocusCell?.[0].id === element.id

  return (
    <TableCellWrapper
      selected={isCellSelected}
      match={match}
      hoverCol={hoveredColIndex === colIndex}
      style={{
        maxWidth: `${resizeingCol?.width}px`,
        minWidth: `${resizeingCol?.width}px`,
      }}
      onClick={(e) => {
        e.preventDefault()
        const target = (e.target as HTMLElement).closest('.table_content')
        if (target) return
        !!path && focusEditor(editor, getStartPoint(editor, path))
      }}
    >
      <span className="table_content" ref={elemRef}>
        {children}
      </span>

      <span
        className="table_resizable"
        contentEditable={false}
        onMouseOver={() => setHoveredColIndex(colIndex)}
        onFocus={() => setHoveredColIndex(colIndex)}
        onMouseOut={() => setHoveredColIndex(null)}
        onBlur={() => setHoveredColIndex(null)}
      >
        <Resizable
          size={{ width: '100%', height: '100%' }}
          enable={{ right: ignoreReadOnly || !readOnly }}
          handleStyles={handleResize}
          onResize={onResize}
          onResizeStop={onResizeStop}
          {...resizableProps}
        />
        <div data-type="table_resizable-controller" />
      </span>

      <span
        className={!readOnly && isCellSelected ? 'table_select' : ''}
        contentEditable={false}
      />
    </TableCellWrapper>
  )
}

export default TableCellElement
