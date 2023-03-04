import styled from 'styled-components'

export const SelectBlockItem = styled('div')`
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_light};

  .select_block-btn {
    &-icon {
      grid-column: span 1;
      grid-row: span 2;
    }
  }

  .heightlight {
    color: red;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_light};
  }

  button {
    display: grid;
    width: inherit;
    grid-template-columns: 3.5rem 1fr;
    grid-template-rows: repeat(2, 1fr);
    column-gap: 0.5rem;
    background-color: inherit;
    cursor: pointer;
    span {
      &:nth-child(1) {
        grid-column: 1/2;
        grid-row: 1/3;
        position: relative;
        width: 3rem;
        height: 3rem;
        justify-self: center;
        border-radius: 2px;
        border: 1px solid #efefef;
      }

      &:nth-child(2) {
        grid-column: 2/3;
        grid-row: 1/2;
        font-size: 0.8rem;
        font-weight: 700;
      }
      &:nth-child(3) {
        grid-column: 2/ 3;
        grid-row: 2/3;
        width: inherit;
        font-size: 0.5rem;
        color: #c3c3c3;
        text-overflow: ellipsis;
        text-align: start;
        white-space: nowrap;
        overflow: hidden;
      }

      &:nth-child(2),
      &:nth-child(3) {
        justify-self: start;
        align-self: center;
      }
    }
  }
`
