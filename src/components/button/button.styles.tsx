import { motion } from 'framer-motion'
import styled from 'styled-components'

export const SearchBtnWrapper = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 600;
  width: 100%;
  min-height: 2.5rem;
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

type FeatureBtnType = {
  pd?: string
}

export const FeatureBtnWrapper = styled('button').attrs<FeatureBtnType>(
  ({ pd }) => pd
)<FeatureBtnType>`
  display: flex;
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ pd }) => pd};
`

export const EditorOptionButtonWrapper = styled('button')`
  width: fit-content;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  position: relative;
  border: none;
  background-color: transparent;
`

type BlockReviewBtnTyep = {
  isFocus: boolean
}

export const BlockReviewBtnWrapper = styled('button').attrs<BlockReviewBtnTyep>(
  (props) => ({
    isFocus: props.isFocus,
  })
)<BlockReviewBtnTyep>`
  background-color: ${({ theme, isFocus }) =>
    isFocus ? theme.colors.primary : theme.colors.white};
  width: 100%;
  font-weight: 800;
  height: 2.8rem;
  color: ${({ theme, isFocus }) =>
    isFocus ? theme.colors.secondary_light : theme.colors.primary};
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  position: relative;
  z-index: 12;
  display: flex;
  align-items: center;

  & > span {
    display: inline-block;
    align-items: center;
  }

  & > span:nth-child(1) {
    background-color: red;
    flex: 1;
  }

  & > span:nth-child(2) {
    flex: 3;
  }

  & > span:nth-child(3) {
    flex: 1;
    visibility: hidden;
    opacity: 0;
    & > svg {
      width: 100%;
    }
  }

  /* .drag-icon {
    display: block;
  } */

  &:hover {
    background-color: ${({ theme, isFocus }) =>
      isFocus ? theme.colors.primary : theme.colors.secondary};

    & > span:nth-child(3) {
      visibility: visible;
      opacity: 1;
      cursor: grab;
    }
  }

  &:active {
    transform: scale(0.98) translateY(1px);
    transition: transform 0.1s ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.primary}`};
    border-radius: inherit;
    z-index: -1;
  }
`
