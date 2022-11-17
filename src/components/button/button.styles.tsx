import styled from 'styled-components'

export const SearchBtnWrapper = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 600;
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem 0.5rem 0 0;
  border-bottom: 2px solid;
  background: white;
  gap: 0.5rem;
  border-color: rgba(0, 0, 0, 0.3);
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 0.4rem 0.4rem 0 0;
  }
  .right_icon {
    width: fit-content;
    height: 1.5rem;
    display: flex;
  }
  .left_icon {
    width: fit-content;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-items: center;
  }
  .description {
    font-size: inherit;
  }
`

export const FeatureBtnWrapper = styled('button')`
  display: flex;
  padding: 0.5rem 1rem;
  flex: 1;
`

export const EditorOptionButtonWrapper = styled('button')`
  width: fit-content;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  position: relative;
  cursor: pointer;
  border: none;
  background-color: transparent;
`
