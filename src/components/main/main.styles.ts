import styled from 'styled-components'

type DashboardMain = {
  show: boolean | undefined | null
  hasCover: boolean
}

export const DashboardMainWrapper = styled('div')<DashboardMain>`
  width: 100%;
  height: 100%;

  .DashboardMain_container {
    background: white;
    height: 100%;
    width: 100%;
    position: relative;

    &-banner {
      width: inherit;
      height: ${({ show }) => (show ? '18rem' : '0')};
      border-bottom: ${({ show }) => (show ? '1px solid' : '0')};
    }

    &-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 3rem;
      gap: 0.5rem;
      background-color: ${({ theme }) => theme.colors.white};
      height: 100%;
      position: relative;
    }
  }
`
