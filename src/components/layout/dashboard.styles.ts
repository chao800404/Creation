import styled from 'styled-components'

export const DashboardLayoutWrapper = styled('main')`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;

  .dashboard_side {
    &-feature {
      display: flex;
      justify-content: start;
      flex-direction: column;
    }

    &-option {
      border-top: 2px solid;
      border-color: ${({ theme }) => theme.colors.primary};
      height: 12rem;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      overflow: hidden;
      min-height: 6rem;
      max-height: 6rem;
    }

    &-controller {
      font-weight: 800;
      padding: 0.5rem;
      width: 100%;
      height: 3.5rem;
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
      border-top: 2px solid ${({ theme }) => theme.colors.primary};
    }

    &-container {
      height: 100%;
      width: 100%;
    }
  }
`

export const IndexLayout = styled('main')`
  width: 100%;

  .index_main {
    width: inherit;
    height: 100%;
    position: relative;
  }
`
