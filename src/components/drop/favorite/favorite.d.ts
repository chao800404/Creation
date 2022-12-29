export type FavoriteBaseType<J> = {
  updateFavorite: (id: string) => void
  list: J[]
}

export type FavoriteTagType<J, T> = FavoriteBaseType<J> & {
  id: string
  menuMap: T
}

export type FavoriteContainerType<J> = FavoriteBaseType<J> & {
  children: JSX.Element
}

export type DragItem = {
  index: number
  id: string
}
