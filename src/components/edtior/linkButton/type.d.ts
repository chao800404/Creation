import { StyledElementProps } from '@udecode/plate'

type LinkItem = Record<'emoji' | 'name' | 'src', string>

type LinkButtonPopupProps<T> = {
  toggle: boolean
  items: T[]
  handleSetSrc: (props: T) => void
}

type LinkButtonElem<T> = {
  element: {
    src: string
  } & TElement
  list: T[]
} & StyledElementProps
