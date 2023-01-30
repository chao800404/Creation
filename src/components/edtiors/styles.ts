import styled from 'styled-components'

export const ToolContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & > span > span {
    color: ${({ theme }) => theme.colors.white};
  }
`
export const DragButtonWrapper = styled.button`
  width: 1.5rem;
  height: 100%;
  margin-right: 0.1rem;
  background: transparent;
  cursor: grab;
  font-size: 1.1rem;
`

export const PlateEditorWrapper = styled.section`
  width: 100%;
  height: 100%;
  margin-top: 3rem;
  position: relative;

  & > .toolbar {
    width: 20rem;
    height: 2.2rem;
    position: fixed;
    bottom: 3rem;
    left: 50%;
    border-radius: 5px 5px 0 0;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0px 0px 0.2rem rgba(0, 0, 0, 0.2);
  }
`

export const BasicToolBarWrapper = styled('div')`
  display: flex;
  padding: 0 0.7rem 0 0.2rem;
`
export const ToolBarWrapper = styled('div')`
  display: flex;
  padding: 0 0.4rem;
  align-items: center;
  svg {
    width: 1.1rem;
  }
`
export const ToolbarButtonsWrapper = styled('div')`
  width: auto;
  border-radius: 8px 8px 0 0;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  padding: 0.4rem 0.5rem;
  height: 100%;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3);

  span[data-testid='ToolbarButton'] {
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.primary_high};

    &:hover {
      background-color: #ececec;
      border-radius: 5px;
    }
  }

  span.gap {
    width: 1px;
    height: 15px;
    background-color: ${({ theme }) => theme.colors.primary_high};
  }
`
