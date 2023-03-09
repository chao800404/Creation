import styled from 'styled-components'

type ExpandableHeading = {
  open: boolean
  focus: boolean
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

  .open_icon {
    grid-column: 1 / 2;
    cursor: pointer;
    align-self: center;
    justify-self: start;

    &-content {
      width: 0.5rem;
      height: 0.5rem;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      display: block;
    }
  }

  .border {
    grid-column: 1 / 2;
    grid-row: 2 / -1;
    justify-self: start;
    cursor: default;
    width: 100%;

    & > span {
      background-color: ${({ theme, focus }) =>
        focus ? theme.colors.primary_high : theme.colors.secondary_light};
      height: 100%;
      width: 2px;
      margin-left: 3px;

      display: block;
    }
  }

  .title {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
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
