import { motion } from 'framer-motion'
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

type PopupItemType = {
  width: number
}

export const PopupItemWrapper = styled('div').attrs<PopupItemType>(
  ({ width }) => width
)<PopupItemType>`
  border-top: 1px solid;
  border-bottom: 1px solid;
  font-size: 0.8rem;
  width: ${({ width }) => `${width}rem`};
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

type WorkspaceItemType = {
  isSelected: boolean
}

export const WorkspaceItemWrapper = styled('div').attrs<WorkspaceItemType>(
  ({ isSelected }) => isSelected
)<WorkspaceItemType>`
  width: 100%;
  min-height: 1.8rem;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-weight: 700;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.white};

  input {
    outline: none;
    border: none;
    font-size: 0.8rem;
    background-color: transparent;
    font-weight: 700;
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.white : theme.colors.primary};
  }

  .add-page-icon {
    position: absolute;
    right: 1rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary : theme.colors.secondary_light};
    color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.white : theme.colors.primary};

    .add-page-icon {
      opacity: 1;
      visibility: visible;
    }
  }

  .root {
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    width: 100%;
    text-decoration: none;
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.white : theme.colors.primary};
    min-height: inherit;

    .workspace-item-icon {
      padding: 0.2rem;
    }

    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 5rem;
      font-size: 0.8rem;
      color: inherit;
    }
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

export const GroupItemWrapper = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: 1.4rem 1fr 1rem;
  padding: 0.4rem 0.2rem;
  position: relative;
  gap: 0.2rem;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_high};
  }

  & > p {
    font-size: 0.8rem;
    align-self: center;
  }

  & > .grop_item-children {
    position: absolute;
    right: calc(-100% - 2rem);
    z-index: -1;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 0.3rem 0.5rem;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`
