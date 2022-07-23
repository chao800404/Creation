import { Map } from 'typescript'

export type WorkspaceItem = {
  id: string
  title?: string
  list?: WorkspaceItem[]
  emoji?: string
  coverImageSrc?: string
}

export type InitiallWorkspace = {
  list: WorkspaceItem[]
  activeItem: WorkspaceItem | null
}

export interface WorkspaceSlice extends InitiallWorkspace {
  addToList: (payload?: string) => void
  updateActiveItem: (id: string | WorkspaceItem) => void
  updateListTitle: (id: string) => void
  removeListItem: (id: string) => void
  setEmoji: (path: string) => void
  removeEmoji: () => void
  setCoverImageSrc: (src: string) => void
}
