import { TableCellElementStyleProps, TElement, Value } from '@udecode/plate'
import styled from 'styled-components'
import { createStyles } from '@udecode/plate-styled-components'

type TableWrapper = {
  selectedCells: TElement[] | null
}

export const TableWrapper = styled('div').attrs<TableWrapper>(
  ({ selectedCells }) => ({
    selectedCells,
  })
)<TableWrapper>`
  margin: 0.5rem 0;
  width: 100%;

  .table-content {
    background-color: ${({ theme }) => theme.colors.primary};
    position: relative;
    width: fit-content;
    max-width: 100%;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #1c1c1c;

    &-body {
      max-width: 100%;
      overflow: auto;
      overflow-y: hidden;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.white};

      &::-webkit-scrollbar {
        height: 0.8rem;
        width: 0;
        background-color: ${({ theme }) => theme.colors.white};
      }

      &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.colors.white};
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  .table-controller-container {
    height: 2.8rem;
  }

  .table-controller {
    padding: 0.5rem 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    width: fit-content;
    z-index: 30;
    background-color: ${({ theme }) => theme.colors.primary};

    & > [data-testid='ToolbarButton'] {
      color: ${({ theme }) => theme.colors.white} !important;
      padding: 0.3rem;
      /* border: 1px solid ${({ theme }) => theme.colors.white}; */
      border-radius: 5px;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary_3};
      }
    }

    .table_controller-gap {
      width: 1px;
      height: 15px;
      background: ${({ theme }) => theme.colors.primary_high};
    }
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    margin: 0;
    overflow: auto;
  }

  *::selection {
    background-color: ${({ selectedCells }) =>
      selectedCells ? 'transparent' : ''};
  }

  tbody.table_body {
    background-color: ${({ theme }) => theme.colors.white};
  }

  [data-slate-node='element'] {
    &::before {
      display: none;
    }
  }
`

export const TableRowWrapper = styled('tr')`
  position: relative;
`

type TableCellWrapperProps = {
  hoverCol: boolean
  selected: boolean | undefined
  match: boolean
}

export const TableCellWrapper = styled('td').attrs<TableCellWrapperProps>(
  ({ hoverCol, selected, match }) => ({ hoverCol, selected, match })
)<TableCellWrapperProps>`
  border: ${({ theme, match }) =>
    match ? `transparent` : `1px solid ${theme.colors.primary_high}`};
  position: relative;
  z-index: ${({ match }) => (match ? 20 : 10)};
  background-color: ${({ theme, match }) =>
    match ? theme.colors.white : 'transaprent'};
  width: auto;
  min-width: 10rem;
  max-width: 15rem;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;

    box-shadow: ${({ match, theme }) =>
      match
        ? `inset 2px 2px 0 transparent, 0px 0px 1px 1.5px ${theme.colors.primary}`
        : 'unset'};
    transform: translate(-50%, -50%);
    z-index: 20;
    pointer-events: none;
  }

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    right: -0.25rem;
    bottom: -0.25rem;
    border-radius: 50%;
    z-index: 100;
    background-color: ${({ theme, match }) =>
      match ? theme.colors.white : 'transparent'};
    border: 2px solid
      ${({ theme, match }) => (match ? theme.colors.primary : 'transparent')};
    user-select: none;
  }

  .table_content {
    padding: 0.5rem 0.8rem;
    display: block;
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
  }

  .table_resizable {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: auto;
  }

  .table_select {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 12;
    background-color: rgb(179, 212, 255);
    opacity: 0.3;
  }

  [data-type='table_resizable-controller'] {
    position: absolute;
    top: 0px;
    right: -2px;
    width: 4px;
    height: 100%;
    z-index: 10;
    background-color: #1c1c1c;
    opacity: ${({ hoverCol }) => (hoverCol ? 1 : 0)};
  }
`
