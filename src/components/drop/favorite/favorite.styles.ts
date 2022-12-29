import styled from 'styled-components'

type FeatureTagType = {
  isDrag: boolean
  content: string
  hasFavorite: boolean
}

export const FeatureTagWrapper = styled.div.attrs<FeatureTagType>(
  ({ isDrag, content, hasFavorite }) => ({ isDrag, content, hasFavorite })
)<FeatureTagType>`
  width: 100%;
  position: relative;

  .accordion {
    position: relative;

    &::before {
      content: ${({ content }) => `"${content}"`};
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-55%);
      font-size: 0.3rem;
      zoom: 0.8;
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.secondary_light};
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      pointer-events: none;
      visibility: ${({ hasFavorite }) => (hasFavorite ? 'visible' : 'hidden')};
    }
  }

  .feature_drag_bound {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0.3rem;
    background: ${({ isDrag }) =>
      isDrag ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    cursor: ns-resize;
    opacity: ${({ isDrag }) => (isDrag ? 1 : 0)};
    transition: all 0.5s ease-in-out;

    &:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.5);
    }
  }
`

type FavoriteContainerType = {
  isActive: boolean
}

export const FavoriteContainerWrappr = styled(
  'div'
).attrs<FavoriteContainerType>(({ isActive }) => ({
  isActive,
}))<FavoriteContainerType>`
  width: 100%;
  position: relative;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: ${({ isActive }) => (isActive ? '10' : '0')};
    background-color: ${({ isActive, theme }) =>
      isActive ? theme.colors.tertiary : 'transparent'};
    opacity: ${({ isActive }) => (isActive ? '0.5' : '0')};
    pointer-events: none;
  }
`
