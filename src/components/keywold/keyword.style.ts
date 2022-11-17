import styled from 'styled-components'

export const KeyboardWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.5rem;

  .keyboard_keyword {
    border-radius: 0.3rem;
    border: 1px solid;
    font-size: inherit;
    padding: 1px 0.3rem;
    text-align: center;
    position: relative;
    zoom: 0.85;
    font-weight: 700;

    &::before {
      content: '';
      position: absolute;
      bottom: 1px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  .keyboard_plus {
    font-size: inherit;
  }
`
