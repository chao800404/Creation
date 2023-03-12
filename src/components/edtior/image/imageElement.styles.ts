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
  padding: ${({ theme: { padding } }) => `${padding.pd_md} 0`};

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
    border-radius: 5px;
    overflow: hidden;

    & {
      .drag_box,
      .image_controller {
        opacity: ${({ focused }) => (focused ? 1 : 0)};
        visibility: ${({ focused }) => (focused ? 'visible' : 'hidden')};
      }
    }

    .image_controller {
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
      z-index: 30;
      transition: opacity 0.3s ease;
    }

    &:hover {
      .image_controller {
        opacity: 1;
        visibility: visible;
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
    padding: ${({ theme: { padding } }) => `${padding.pd_sm} ${padding.pd_md}`};

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

type IsActive = {
  isActive: boolean
}

export const ImageControllBtn = styled('button').attrs<IsActive>(
  (props) => props
)<IsActive>`
  width: 100%;
  display: flex;
  align-items: center;
  background: transparent;
  color: ${({ isActive }) =>
    isActive ? 'rgba(255, 255, 255);' : 'rgba(255, 255, 255, 0.5);'};
  gap: 0.3rem;
  padding: 0.2rem;

  .image_controller-icon {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background-color: ${({ theme }) => theme.colors.primary_3};
  }
`
