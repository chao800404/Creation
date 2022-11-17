import styled from 'styled-components'

export const DashboardLayoutWrapper = styled('main')`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;

  .dashboard_side-feature {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  .dashboard_side-option {
    border-top: 2px solid;
    border-color: ${({ theme }) => theme.colors.primary};
    height: 12rem;
    flex-direction: column;
    display: flex;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    overflow: hidden;
  }

  .dashboard_side_controller {
    font-weight: 800;
    margin: 0.5rem 0 0 0;
    padding: 0.5rem;
    width: 100%;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    border-top: 2px solid ${({ theme }) => theme.colors.primary};
  }
`

export const IndexLayout = styled('main')`
  width: 100%;

  .index_main {
    width: inherit;
    height: 100%;
    position: relative;
  }

  .index_nav {
  }
`
