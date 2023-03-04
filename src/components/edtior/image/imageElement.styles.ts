import { ImageElementPropsCaption } from '@udecode/plate'
import { isNumber } from 'lodash'
import styled from 'styled-components'
import { Align, Vertical } from './type'

type ImageComponentProps = {
  align: Align
  focused: boolean
  dragging: boolean
  vertical: Vertical
}

export const ImageComponentWrapper = styled('div').attrs<ImageComponentProps>(
  ({ align, focused, dragging, vertical }) => ({
    align,
    focused,
    dragging,
    vertical,
  })
)<ImageComponentProps>`
  width: auto;
  padding: 0.5rem 0;

  figure {
    position: relative;
    width: auto;
    height: auto;
  }

  .drag_box {
    width: 0.25rem;
    height: 1.5rem;
    background-color: ${({ theme }) => theme.colors.primary_high};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &-1 {
      left: -0.5rem;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &-2 {
      right: -0.5rem;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  .image_resizable {
    height: 25rem !important;
    margin-bottom: 0.5rem;
    min-width: 25rem !important;
    box-shadow: ${({ theme, focused }) =>
      `inset 0 0 0 transparent, 0 0 0 1px ${
        focused ? theme.colors.primary : 'transparent'
      }`};

    & {
      .drag_box,
      .image_controller {
        opacity: ${({ focused }) => (focused ? 1 : 0)};
        visibility: ${({ focused }) => (focused ? 'visible' : 'hidden')};
      }
    }
  }

  .image_container {
    width: 100%;
    object-fit: cover;
    object-position: ${({ vertical }) => `center ${vertical}`};
    height: 25rem;
  }

  .image_textarea {
    & > textarea {
      border: 1px solid ${({ theme }) => theme.colors.primary_high};
      width: 20rem;
      padding: 0.2rem;
      height: auto !important;
    }
  }

  .image_controller {
    position: absolute;
    width: fit-content;
    padding: 0.5rem;
    top: 0.2rem;
    left: 0.2rem;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      width: 1px;
      height: 13px;
      background-color: ${({ theme }) => theme.colors.primary_3};
    }

    div.base_btn-img {
      width: 1.3rem;
      height: 1.3rem;
      color: ${({ theme }) => theme.colors.white};
      padding: 2px;
      border-radius: 2px;
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary_3};
      }
      svg {
        display: block;
      }
    }

    div.active {
      background-color: ${({ theme }) => theme.colors.primary_3};
    }

    & > [data-type='controller-drag-img'] {
      background-color: ${({ dragging, theme }) =>
        dragging ? theme.colors.primary_3 : 'unset'};
    }
  }

  .image_controller,
  .drag_box {
    visibility: hidden;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    z-index: 20;
  }

  .image_popup {
    position: absolute;
    top: 2.8rem;
    left: 0.2rem;
  }
`

export const BaseImageElementWrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary_high};
  cursor: pointer;
  margin: 0.5rem 0;
  user-select: none;
  position: relative;

  .base_image {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 0.8rem 0;
    border-radius: 5px;

    &-icon {
      display: inline-block;
      width: 1.3rem;
      height: 1.3rem;
      margin: 0 1rem;
    }
  }

  .base_image-popup {
    position: absolute;
    bottom: -14.5rem;
    z-index: 30;
    left: 1rem;
  }

  .base_image-commad {
    position: absolute;
    right: 1rem;
    padding: 0.2rem 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary_2};
    font-size: 0.6rem;
    border-radius: 5px;
    font-weight: 700;
  }
`

export const ImagePopupItemWrapper = styled('div')`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.25rem;

  .image_container {
    position: relative;
    height: 3.2rem;
    width: 2.5rem;
    border-radius: 3px;
    overflow: hidden;
  }

  .image_title {
    font-size: 0.9rem;
  }

  .searchFields_color {
    color: red;
  }
`
