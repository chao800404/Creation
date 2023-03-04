import { BaseImageOption } from './transforms/type'
import { ImagePopupItemProps, ImageItemBtnProps } from '../image/type'
import { MyImageListElement, MyImageItemElement } from '../plateTypes'
import { StyledElementProps } from '@udecode/plate'
export type ImageItemButtonProps = ImageItemBtnProps & BaseImageOption

type ImageListElement = StyledElementProps<
  MyImageListElement[],
  MyImageListElement
>

type ImageItemElement = StyledElementProps<
  MyImageItemElement[],
  MyImageItemElement
>

export type ImageItemPopupBtnProps = ImageItemButtonProps & {
  visible: boolean
  hide: () => void
  show: () => void
}
