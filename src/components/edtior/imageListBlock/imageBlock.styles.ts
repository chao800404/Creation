import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ImageListWrapper = styled('div')`
  padding: 0.8rem 0 0.8rem 0;

  .image_list {
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    position: relative;
  }
`

type ImageItemProps = {
  isActive: boolean
  hasImage: boolean
}

export const ImageItemWrapper = styled('div').attrs<ImageItemProps>(
  (props) => ({
    ...props,
  })
)<ImageItemProps>`
  position: relative;

  &:hover {
    & .img_item-img > .drag > span,
    .option {
      opacity: 1;
      visibility: visible;
    }
  }

  .img_item-content {
    width: 14rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    box-shadow: 0 0 0.2rem ${({ theme: { colors } }) => colors.shadow};
    border: ${({ isActive }) =>
      isActive
        ? '1.2px solid var(--colors-gray1)'
        : '1px solid var(--colors-gray11)'};
    will-change: scale;
    position: relative;

    &-icon {
      svg {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }

  .img_item-img {
    height: 9rem;
    display: grid;
    grid-template-columns: 1fr repeat(2, 3fr) 1fr;
    grid-template-rows: repeat(5, 1fr);
    background-color: ${({ theme }) => theme.colors.primary};
    gap: 0.5rem;
    position: relative;

    &-x {
      grid-column: 1/ -1;
      grid-row: 1/-1;
      background-position: center;
      background-size: 100%;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .option {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 30;
      opacity: ${({ isActive }) => (isActive ? 1 : 0)};
      visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
    }

    & > .drag {
      grid-column: 2 / 4;
      grid-row: 1 / -1;
      color: white;
      color: ${({ theme }) => theme.colors.white};

      & > span {
        width: 1.2rem;
        height: 2rem;
        cursor: grab;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 0.2rem ${({ theme: { colors } }) => colors.shadow};
        transform: rotate(90deg) translateX(-0.8rem);
        margin: auto;
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.colors.primary_2};
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
        will-change: transform;

        & > svg {
          display: block;
        }

        &:active {
          transform: scale(0.9) rotate(90deg) translateX(-0.9rem);
          cursor: grabbing;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      }
    }

    & > .add {
      grid-column: 2 / 4;
      grid-row: 2 / 4;
    }

    & > .delete {
      grid-column: 2 / 3;
      grid-row: 4 /5;
    }

    & > .insert {
      grid-column: 3 / 4;
      grid-row: 4 / 5;
    }

    & > .download {
      grid-column: 3 / 4;
      grid-row: 5 / 6;
    }

    &-btn {
      border-radius: 3px;
      background-color: rgba(255, 255, 255, 0.4);
      color: ${({ theme }) => theme.colors.white};
      gap: 0.5rem;
      height: 100%;
      box-shadow: 0.3rem 0.3rem 0.5rem rgba(0, 0, 0, 0.9);
      user-select: none;
      border: 1px solid rgba(255, 255, 255, 0.4);
      cursor: pointer;
      position: relative;
      will-change: transform;
      display: flex;
      align-items: center;
      justify-content: center;

      &:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }

      &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }

      span {
        font-size: 0.9rem;
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary_high};
      }
    }

    &-icon {
      width: 1.5rem;
    }
  }

  .img_item-desc {
    min-height: 5rem;
    padding: 0.4rem 0.8rem 0.8rem 0.8rem;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .tippy-box {
    background-color: transparent !important;
    color: ${({ theme }) => theme.colors.primary_high};
    display: flex;
    max-width: unset !important;
  }

  .tippy-arrow {
    &::before {
      display: none;
    }
  }
`

type ImageItemRowProps = {
  focus: boolean
}

export const ImageItemRowWrapper = styled('div').attrs<ImageItemRowProps>(
  (props) => ({
    ...props,
  })
)<ImageItemRowProps>`
  padding: ${({ theme: { padding } }) => padding.pd_sm};

  &:hover {
    & > .image_item-row {
      /* border: 1px solid ${({ theme }) => theme.colors.primary_high}; */

      & > .image_item-row-x {
        background-color: ${({ theme }) => theme.colors.secondary};
      }

      & > .image_item-row-icon {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`
export const ImageItemOptionButtonWrapper = styled(motion.span)`
  display: flex;
  padding: 0.3rem 0.5rem;
  position: relative;
  gap: 0.8rem;
  border-radius: 3px;
  will-change: scale;
  zoom: 0.9;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_3};
  }
`
