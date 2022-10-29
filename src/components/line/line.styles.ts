import styled from 'styled-components'

type Value = number | string

// type StyleType = Record<'right' | 'height' | 'left', Value>

export type LineProps = {
  dragStart?: boolean
  right?: Value
  height: Value
  left?: Value
}

export const BoundLineWrapper = styled('div').attrs<LineProps>((props) => {
  return {
    dragStart: props.dragStart,
    right: props.right,
    height: props.height,
    left: props.left,
  }
})<LineProps>`
  position: absolute;
  width: 2px;
  top: 50%;
  height: 100%;
  transform: translateY(-50%);
  cursor: col-resize;
  z-index: 100;
  right: ${({ right }) => right || right + 'px'};
  height: ${({ height }) => height || height + 'px'};

  .BoundLineContent {
    width: ${({ dragStart }) => (dragStart ? '.4rem' : '.2rem')};
    height: 100%;
    right: 0;
    opacity: ${({ dragStart }) => (dragStart ? 1 : 0)};
    background-color: #1c1c1c;
  }

  &:hover .BoundLineContent {
    width: 0.3rem;
    transition: 0.5s ease;
    opacity: 1;
  }
`
