import styled from 'styled-components'

type Props = {
  width: number
}

export const SideWrapperLayout = styled('div').attrs<Props>((props) => ({
  width: props.width,
}))<Props>`
  height: inherit;
  position: sticky;
  top: 0;
  left: 0.5rem;
  z-index: 10000;
  padding: 0.5rem 0 0.5rem 0;
  background-color: #ffffff;
  position: relative;

  .sideWrapperContainer {
    flex-direction: column;
    height: 100%;
    border-radius: 0.5rem;
    position: relative;
    box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.2);
    border: 2px solid #1c1c1c;
    background-color: #ffffff;
    display: flex;
    width: ${({ width }) => `${width || 350}px`};

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      z-index: -10;
      bottom: -0.5rem;
      right: -0.5rem;
      background-color: #1c1c1c;
      border-radius: 0.5rem;
    }
  }
`
