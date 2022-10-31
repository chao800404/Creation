import styled from 'styled-components'

type DashboardMain = {
  show: boolean
}

export const DashboardMainWrapper = styled('div')<DashboardMain>`
  width: inherit;
  height: 100%;
  position: relative;
  border-right: 2px solid;
  border-left: 2px solid;
  border-color: #1c1c1c;

  .DashboardMain_container {
    background: white;
    height: 100%;
    padding: 1rem;

    &-banner {
      width: inherit;
      height: ${({ show }) => (show ? '18rem' : '0')};
      position: relative;
      border-bottom: ${({ show }) => (show ? '1px solid' : '0')};
    }

    &-content {
      display: flex;
      flex-direction: column;
      width: initial;

      &-block {
      }
    }
  }
`
