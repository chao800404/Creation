import styled from 'styled-components'

type ExpandableHeading = {
  open: boolean
}

export const ExpandableHeadingWrapper = styled('div').attrs<ExpandableHeading>(
  (props) => props
)<ExpandableHeading>`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1.8rem calc(100% - 1.8rem);
  grid-template-rows: auto 1fr;
  margin: 0.5rem 0;

  .arrow {
    grid-column: 1 / 2;
    cursor: pointer;
    width: 100%;
    align-self: center;

    & > span {
      will-change: rotate;
      display: block;
      transform-origin: center;
      width: 0.8rem;
      height: 0.8rem;
      transition: all 0.3s ease;
      transform: ${({ open }) => `rotate(${open ? '90deg' : '0deg'})`};

      svg {
        transform: rotate(180deg);
        margin-bottom: auto;
        margin-top: auto;
        display: block;
      }
    }
  }

  .title {
    grid-column: 2 / 3;
    align-self: center;
    h1,
    h2,
    h3 {
      padding: 0.2rem 0;
      margin: 0;
    }
  }
  .content {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }
`
