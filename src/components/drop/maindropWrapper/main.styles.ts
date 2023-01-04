import styled from 'styled-components'

type MainWrapperTyep = {
  isActive: boolean
}

export const MainWrapper = styled('section').attrs<MainWrapperTyep>(
  ({ isActive }) => ({
    isActive,
  })
)<MainWrapperTyep>`
  height: 100%;
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    top: 0;
    transition: all 0.3s ease-in-out;
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.tertiary : 'transparent'};
    opacity: ${({ isActive }) => (isActive ? 0.5 : 0)};
    z-index: 10;
    pointer-events: none;
  }
`
