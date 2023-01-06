import { motion } from 'framer-motion'
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

export const BlockInputBaseWrapper = styled(motion.div)`
  width: 100%;
  position: relative;

  .add_block-icon {
    position: absolute;
    left: -1.5rem;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &-content {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .add_block-popup {
    position: absolute;
    left: 0;
    width: fit-content;
    z-index: 300;
  }
`

type AddBlocknputWrapperTyep = {
  isFocus: boolean
}

export const AddBlocknputWrapper = styled('div')`
  position: relative;
  min-height: 28px;
  display: flex;
  align-items: center;

  .add_block-input {
    font-size: 1.1rem;
    align-self: center;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    background-color: transparent;
    width: 100%;

    &::placeholder {
      font-weight: 500;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.secondary_light};
    }

    &:focus::placeholder {
      color: ${({ theme }) => theme.colors.primary_high};
    }
  }
`
