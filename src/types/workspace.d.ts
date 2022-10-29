import { Map } from 'typescript'

export type WorkspaceItem = {
  id: string
  title?: string
  list?: WorkspaceItem[]
  emoji?: string
  cover?: string
  favorite: boolean
  editable: boolean
  loaded: boolean
  activeId: string
  [key: string]: unknown
}

export interface InitiallWorkspace extends WorkspaceItem {
  list: WorkspaceItem[]
  activeId: string
}

export interface WorkspaceSlice extends InitiallWorkspace {
  setLoaded: () => void
  addToList: (payload?: string) => void
  updateActiveItem: (id: string | WorkspaceItem) => void
  setListItem: () => void
  updateListTitle: (title: string, id?: string) => void
  removeListItem: (id: string) => void
  setEmoji: (path: string) => void
  setCoverImageSrc: (src: string) => void
  selectItemById: (id: string) => void
  toggleFavorite: (id?: string) => void
  toggleEditable: (id: string) => void
  removeCover: () => void
  removeEmoji: () => void
}
