import styled from 'styled-components'

export const OptionToolWrapper = styled('div')`
  .option {
    position: absolute;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    margin-right: 0.3rem;
    margin-top: 0.3rem;
    padding: 0.3rem;
    width: 1.75rem;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    background-color: rgba(0, 0, 0, 0.9);
    box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.5);
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
    will-change: scale;
    overflow: hidden;
    width: 30px;
    height: 20px;

    & > svg {
      width: 100%;
      display: block;
      fill: ${({ theme }) => theme.colors.primary_2};
    }

    &-content {
      will-change: auto;
    }

    &-icon {
      will-change: auto;
      height: 100%;
    }
  }
`
