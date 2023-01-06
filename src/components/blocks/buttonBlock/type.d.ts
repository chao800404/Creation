import React from 'react'

type ButtonBlockPopupListItemProps<T> = {
  node: T
  parentNode?: T
  hasChild: boolean
  searchFields: string | null
  onClick: React.MouseEventHandler<HTMLDivElement>
  isFavorite?: boolean
  isActive: boolean
}

type ButtonBlockPopupProps<T> = {
  list: T[]
  history: T[]
  link: string
  name: string
  newTab: boolean
  linkSet: (link: string) => void
  toggleOpen: (toggle?: boolean) => void
  toggleNewTab: (toggle: boolean) => void
  nameSet: (name: string) => void
  linkIdSet: (id: string) => void
}

type NodeViewPropsAttrs = {
  open: boolean
  link: string
  newTab: boolean
  name: string
  id: string
}
