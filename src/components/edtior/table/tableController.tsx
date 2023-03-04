import {
  deleteColumn,
  deleteRow,
  deleteTable,
  insertTableColumn,
  insertTableRow,
  TableToolbarButton,
} from '@udecode/plate'
import React from 'react'
import { markTooltip } from '../basic-marks/Tooltip'
import { TableMoveBelow } from '@styled-icons/fluentui-system-filled/TableMoveBelow'
import { TableDeleteRow } from '@styled-icons/fluentui-system-filled/TableDeleteRow'
import { TableMoveLeft } from '@styled-icons/fluentui-system-filled/TableMoveLeft'
import { TableDeleteColumn } from '@styled-icons/fluentui-system-filled/TableDeleteColumn'
import { DeleteLines } from '@styled-icons/fluentui-system-regular/DeleteLines'
import { Table } from '@styled-icons/bootstrap/Table'

export const TableController = function ({
  handleToggleHeader,
}: {
  handleToggleHeader: () => void
}) {
  return (
    <>
      <TableToolbarButton
        icon={<Table />}
        tooltip={markTooltip({ name: 'heading', command: 'toggle' })}
        onMouseDown={() => handleToggleHeader()}
        transform={() => false}
      />
      <span className="table_controller-gap" />
      <TableToolbarButton
        icon={<TableMoveBelow />}
        transform={insertTableRow}
        tooltip={markTooltip({ name: 'Row', command: 'Insert' })}
      />
      <TableToolbarButton
        icon={<TableDeleteRow />}
        transform={deleteRow}
        tooltip={markTooltip({ name: 'Row', command: 'Delete' })}
      />
      <span className="table_controller-gap" />
      <TableToolbarButton
        icon={<TableMoveLeft />}
        transform={insertTableColumn}
        tooltip={markTooltip({ name: 'Column', command: 'Insert' })}
      />
      <TableToolbarButton
        icon={<TableDeleteColumn />}
        transform={deleteColumn}
        tooltip={markTooltip({ name: 'Column', command: 'Delete' })}
      />
      <span className="table_controller-gap" />
      <TableToolbarButton
        icon={<DeleteLines />}
        transform={deleteTable}
        tooltip={markTooltip({ name: 'Table', command: 'Delete' })}
      />
    </>
  )
}
