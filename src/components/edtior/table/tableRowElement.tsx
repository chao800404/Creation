import React from 'react'
import { getAboveNode, Value } from '@udecode/plate-core'
import { ELEMENT_TR, TableRowElementProps } from '@udecode/plate'
import { TableRowWrapper } from './table.styles'
import { shallow } from 'zustand/shallow'

const TableRowElement = <V extends Value>(props: TableRowElementProps<V>) => {
  const { attributes, children, nodeProps, element, editor } = props

  const focusRow = getAboveNode(editor, { match: { type: ELEMENT_TR } })

  return (
    <TableRowWrapper
      className="table_row"
      style={{ background: focusRow?.[0].id === element.id ? '#F4F5F7' : '' }}
    >
      {children}
    </TableRowWrapper>
  )
}

export default TableRowElement
