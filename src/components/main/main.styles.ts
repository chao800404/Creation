import styled from 'styled-components'

type DashboardMain = {
  show: boolean | undefined | null
  hasCover: boolean
}

export const DashboardMainWrapper = styled('div')<DashboardMain>`
  width: 100%;
  height: 100%;
  position: relative;

  .DashboardMain_container {
    background: white;
    height: 100%;
    /* padding: 1rem; */
    width: 100%;

    &-banner {
      width: inherit;

      height: ${({ show }) => (show ? '18rem' : '0')};
      position: relative;
      border-bottom: ${({ show }) => (show ? '1px solid' : '0')};
    }

    &-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 3rem;
      gap: 0.5rem;

      &-gap {
        height: ${({ hasCover }) => (hasCover ? '1.5rem' : '2.5rem')};
      }

      &-header {
        display: flex;
        align-items: center;
        width: 100%;
      }

      &-add {
        width: 100%;
        margin-top: 1rem;
        position: relative;
        display: inherit;
        flex-direction: column;
        gap: 0.2rem;
      }
    }
  }
`
