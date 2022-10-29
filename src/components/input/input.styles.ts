import styled from 'styled-components'

export const InputWrapper = styled('div')`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  .input-icon {
    position: absolute;
    left: 0;
    pointer-events: none;
    margin-left: 1rem;
  }

  .input-content {
    border: 1px solid #c3c3c3;
    width: 100%;
    padding: 0.6rem 0 0.6rem 3rem;
    border-radius: 5px;
  }
`
