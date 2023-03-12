import styled from 'styled-components'
import Link from 'next/link'
import { is } from 'immer/dist/internal'

export const TreeViewWrapper = styled.div`
  height: 100%;

  li {
    overflow: hidden;
    cursor: pointer;
  }

  .dropTarget {
    background-color: #e8f0fe;
  }

  .treeRoot {
    box-sizing: border-box;
    height: 100%;
    padding: 32px;
  }

  .draggingSource {
    opacity: 0.3;
  }

  .placeholderContainer {
    position: relative;
  }
`

export const PlaceholderWrapper = styled.div`
  background-color: #1967d2;
  height: 2px;
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  top: 0;
`

export const DragPreviewWrapper = styled.div`
  align-items: 'center';
  background-color: #1c1c1c;
  border-radius: 4px;
  box-shadow: 0 12px 24px -6px ${({ theme: { colors } }) => colors.shadow},
    0 0 0 1px ${({ theme: { colors } }) => colors.shadow};
  color: #fff;
  display: inline-flex;
  font-size: 14px;
  padding: ${({ theme: { padding } }) => `${padding.pd_sm} ${padding.pd_lg}`};
  pointer-events: none;
  gap: ${({ theme }) => theme.padding.pd_md};
  transform: translate(-50%, -50%);

  .image_container {
    width: 1rem;
    height: 1rem;
    position: relative;
  }
`

type CustomNodeType = {
  isSelected: boolean
  isParent: boolean
  showInput: boolean
}

export const CustomNodeWrapper = styled.div.attrs<CustomNodeType>(
  ({ isSelected, isParent, showInput }) => ({
    isParent,
    isSelected,
    showInput,
  })
)<CustomNodeType>`
  input {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 0.8rem;
    font-weight: 700;
    caret-color: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.white : theme.colors.primary};
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.white : theme.colors.primary};
  }

  .root {
    align-items: center;
    display: flex;
    width: 100%;
    text-decoration: none;
    height: 32px;
    position: relative;
    z-index: 1;
    padding: ${({ theme: { padding } }) => `0 ${padding.pd_md}`};
    color: ${({ isSelected, isParent, theme }) =>
      isSelected
        ? '#ffffff'
        : isParent
        ? theme.colors.primary
        : theme.colors.primary_2};

    &::after {
      content: '';
      width: 500px;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #1c1c1c;
      height: inherit;
      pointer-events: none;
      z-index: -1;
      opacity: ${({ isSelected }) => (isSelected ? '1' : '0')};
    }

    .expand {
      align-items: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      transition: transform linear 0.1s;
      transform: rotate(0deg);

      & > .arrow_icon {
        padding: ${({ theme: { padding } }) => padding.pd_sm};
      }
    }

    svg {
      font-size: 1rem;
    }

    .type_icon {
      align-items: center;
      display: flex;
      justify-content: center;
      padding: ${({ theme: { padding } }) => padding.pd_sm};
    }

    .isOpen {
      transform: rotate(90deg);
    }

    .controller {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      padding: 0 ${({ theme: { padding } }) => padding.pd_md};
      height: 100%;
      gap: 0.3rem;
      visibility: hidden;
      opacity: 0;
      & > .handle {
        cursor: grab;
        display: flex;
      }
    }

    &:hover {
      .controller {
        opacity: ${({ showInput }) => (showInput ? 0 : 1)};
        visibility: ${({ showInput }) => (showInput ? 'hidden' : 'visible')};
      }

      &:before {
        content: '';
        width: 500px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: ${({ theme }) => theme.colors.secondary_light};
        z-index: -1;
      }
    }

    .label {
      padding-inline-start: ${({ theme: { padding } }) => padding.pd_sm};
      color: inherit;
      font-size: 0.8rem;
      margin-top: 0.1rem;
      width: inherit;

      p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
`
