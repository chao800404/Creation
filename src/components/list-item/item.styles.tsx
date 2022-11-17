import styled from 'styled-components'

export type BaseItem = {
  width?: number
}

export const BaseItemWrapper = styled('div').attrs<BaseItem>((props) => {
  return {
    width: props.width,
  }
})<BaseItem>`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 2px 0;
  height: fit-content;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;

  .base_item-icon {
    height: 100%;
    width: fit-content;
  }

  .base_item-header {
    margin-left: 0.2rem;
    color: inherit;
    font-size: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: inherit;
    width: ${(props) => `${props.width}px` || '100%'};
  }
`

type Item = {
  fontSize: string
  fontWeight: number | string
  width: string
}

export const ItemWrapper = styled('div').attrs<Item>((props) => {
  return {
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    width: props.width,
  }
})<Item>`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 2px 0;
  height: fit-content;

  .base_item-icon {
    height: 100%;
    width: fit-content;
  }

  .base_item-header {
    margin-left: 0.2rem;
    color: ${({ color, theme }) => color || theme.colors.primary};
    font-size: ${({ fontSize }) => fontSize};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: ${({ fontWeight }) => fontWeight};
    width: ${({ width }) => width};
  }
`

export const PopupItemWrapper = styled('div')`
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: #cccccc;
    border-radius: 0.2rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  .container {
    margin-left: 0.2rem;
  }
`

type WorkspaceItemWrapper = {
  hoverColor: string
  color: string
  backgroundColor: string
}

export const WorkspaceItemWrapper = styled('div').attrs<WorkspaceItemWrapper>(
  (props) => {
    return {
      color: props.color,
      hoverColor: props.hoverColor,
      backgroundColor: props.backgroundColor,
    }
  }
)<WorkspaceItemWrapper>`
  width: 100%;
  position: relative;
  height: 1.8rem;
  font-family: 'Roboto', sans-serif;

  &:hover {
    .workspaceItem_content {
      color: ${({ hoverColor, theme }) => hoverColor || theme.colors.primary};
      background-color: ${({ backgroundColor, theme }) =>
        backgroundColor === theme.colors.primary
          ? theme.colors.primary
          : '#c3c3c3'};
    }
  }

  .workspaceItem_content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: inherit;
    height: inherit;
    position: relative;
    z-index: 300;
    color: ${({ color }) => color};
    cursor: pointer;
    font-weight: bold;
    font-size: 0.9rem;
    background-color: ${({ backgroundColor }) => backgroundColor};
  }

  .WorkspaceItem_feature {
    visibility: hidden;
    margin-right: 0.5rem;
    display: flex;

    .WorkspaceItem_feature-grab {
      cursor: grab;
    }
  }

  &:hover .WorkspaceItem_feature {
    visibility: visible;
  }
`

export const UserPopupItemWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .userpopup_item-desc {
    font-size: inherit;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: inherit;
  }
`
