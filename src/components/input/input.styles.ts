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

  .add_block-input {
    width: 100%;
    font-size: 1.25rem;
    font-weight: normal;
  }

  .add_block-icon {
    position: absolute;
    left: -2.2rem;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);

    &-content {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .add_block-popup {
    position: absolute;
    left: 0;
    width: fit-content;
    z-index: 300;
    bottom: -20.5rem;
  }
`

type AddBlocknputWrapperTyep = {
  isFocus: boolean
}

export const AddBlocknputWrapper = styled('div').attrs<AddBlocknputWrapperTyep>(
  ({ isFocus }) => ({ isFocus })
)<AddBlocknputWrapperTyep>`
  position: relative;
  min-height: 28px;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  cursor: text;

  .add_block-input {
    font-size: 1.1rem;
    align-self: center;
    grid-columns: 1 / -1;
    grid-row: 1 / -1;
    background-color: transparent;

    &::placeholder {
      color: ${({ isFocus, theme }) => (isFocus ? '#E3E3E3' : '#efefef')};
    }
  }
`
