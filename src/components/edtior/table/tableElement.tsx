import React, { useCallback } from 'react'
import { Value } from '@udecode/plate-core'
import { getRootProps } from '@udecode/plate-styled-components'
import {
  TableElementProps,
  useSelectedCells,
  useTableColSizes,
  useTableStore,
  findNodePath,
  setNodes,
} from '@udecode/plate'
import { TableWrapper } from './table.styles'

import { shallow } from 'zustand/shallow'
import { TableController } from './tableController'
import { useReadOnly } from 'slate-react'
import { MyTableRowElement, MyTableThElement } from '../plateTypes'

const TableElement = <V extends Value>({
  transformColSizes,
  popoverProps,
  ...props
}: TableElementProps<V>) => {
  const { children, element, editor } = props

  const selectedCells = useTableStore().get.selectedCells()
  const path = findNodePath(editor, element)
  const readOnly = useReadOnly()

  let colSizes = useTableColSizes(element)

  if (transformColSizes) {
    colSizes = transformColSizes(colSizes)
  }

  useSelectedCells()

  const handleToggleHeader = useCallback(() => {
    const firstNode = element.children[0] as MyTableRowElement
    const checkType = firstNode.children[0].type === 'th'

    if (path && firstNode?.children) {
      firstNode.children.forEach((item, i) => {
        setNodes<MyTableThElement>(
          editor,
          { type: checkType ? 'td' : 'th' },
          { at: [...path, 0, i] }
        )
      })
    }
  }, [editor, element.children, path])

  return (
    <TableWrapper selectedCells={selectedCells}>
      <div className="table-content">
        {!readOnly && (
          <div className="table-controller-container">
            <div className="table-controller" contentEditable={false}>
              <TableController handleToggleHeader={handleToggleHeader} />
            </div>
          </div>
        )}
        <div
          className="table-content-body"
          style={{ padding: !readOnly ? '3px 0' : '0' }}
        >
          <table>
            <colgroup contentEditable={false}>
              {colSizes.map((width, index) => (
                <col key={index} style={width ? { width } : undefined} />
              ))}
            </colgroup>

            <tbody className="table_body">{children}</tbody>
          </table>
        </div>
      </div>
    </TableWrapper>
  )
}

export default React.memo(TableElement)
