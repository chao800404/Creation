import styled from 'styled-components'

export const LaybelContainerWrapper = styled.div`
  width: 100%;
  display: flex;
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
    isSelected ? '' : `1px silid ${theme.colors.secondary_dark}`};
  border-right: 1px solid;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    opacity: 1;
    .label-close {
      opacity: 1;
      visibility: visible;
    }
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 100%;
    border-bottom: ${({ isSelected, theme }) =>
      `3px solid ${isSelected ? theme.colors.primary : 'transparent'}`};
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
  }
  .workspace-item-icon {
  }

  .label-close {
    position: absolute;
    right: 0.2rem;
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
    width: 6rem;
    font-weight: 700;
    margin-top: 4px;
    margin-left: 5px;
  }
`
