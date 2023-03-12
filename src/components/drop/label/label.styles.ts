import styled from 'styled-components'

type LaybelContainerType = {
  isActive: boolean
}

export const LaybelContainerWrapper = styled('div').attrs<LaybelContainerType>(
  ({ isActive }) => ({ isActive })
)<LaybelContainerType>`
  width: 100%;
  display: flex;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.tertiary : ''};
  opacity: ${({ isActive, theme }) => (isActive ? '0.8' : '1')};
`

type LabelItemType = {
  isSelected: boolean
}

export const LabelItemWrapper = styled.div.attrs<LabelItemType>(
  ({ isSelected }) => ({ isSelected })
)<LabelItemType>`
  height: 100%;
  width: 8rem;
  position: relative;

  border: ${({ isSelected, theme }) =>
    isSelected ? '' : `1px silid ${theme.colors.primary}`};
  border-right: 1px solid;
  position: relative;

  &:hover {
    .root {
      opacity: 1;
    }
    .label-close {
      opacity: 1;
      visibility: visible;
    }
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 50%;
    height: 2px;
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.white : 'transparent'};

    /* border-bottom: ${({ isSelected, theme }) =>
      `1px solid ${isSelected ? theme.colors.white : 'transparent'}`}; */
    /* background-color: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.primary : 'transparent'}; */
    pointer-events: none;
    z-index: 10;
  }

  .root {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: auto;
    text-decoration: none;
    padding: 0 0.3rem;
    gap: 0.3rem;
    opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
    color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.white : theme.colors.primary};
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary : theme.colors.white};
  }
  .workspace-item-icon {
  }

  .label-close {
    position: absolute;
    right: 0.5rem;
    width: 1rem;
    height: 1rem;

    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-out;
    cursor: pointer;
  }

  p {
    font-size: auto;
    zoom: 0.7;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 5.5rem;
    font-weight: 700;
    margin-top: 4px;
    margin-left: 5px;
  }
`
