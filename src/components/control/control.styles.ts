import styled from 'styled-components'

export const WorkspaceControllerWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .WorkspaceController_content {
    display: flex;
    gap: 0.3rem;

    &-icon {
      cursor: pointer;
    }
  }

  p {
    font-size: 1.2rem;
    font-weight: 800;
  }
`
