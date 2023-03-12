import { TImageElement } from '@udecode/plate'

export type Align = 'left' | 'center' | 'right'
export type Vertical = 'top' | 'center' | 'bottom'
export type ImageElements = {
  align: Align
  vertical: Vertical
} & TImageElement

export type HandleFn<T> = (props: T) => void
export type HandleUrlSet<T> = HandleFn<T>

export type BaseImageProps<T> = {
  handleUrlSet: HandleUrlSet<T>
  items: T[]
  children: React.Node
}

export type ImagePopupItemProps = {
  name: string
  src: string
}
