export type SelectItemProps = {
  children: JSX.Element
  active: boolean
  handleOnClick: React.MouseEventHandler<HTMLDivElement>
}

export type InternalLinkProps<T, J> = {
  index: number
  items: T[]
  renderItem: (props: { searchFields: string }) => JSX.Element
  handleUrlSet: J
  setListLength: (length: number) => void
  setIndex: React.Dispatch<React.SetStateAction<number>>
}

export type SelectElemRef =
  | ((instance: HTMLDivElement | null) => void)
  | React.RefObject<HTMLDivElement>
  | null
  | undefined

export type SelectItemElem = (
  props: SelectItemProps,
  ref: SelectElemRef
) => JSX.Element
