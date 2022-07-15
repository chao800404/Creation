import { Map } from 'typescript'

export type WorkspaceItem = {
  id: string
  title?: string
  list?: WorkspaceItem[]
}

export type InitiallWorkspace = {
  list: WorkspaceItem[]
  status: {
    activeItem: string
  }
}

export interface WorkspaceSlice extends InitiallWorkspace {
  addToList: (payload?: string) => void
  updateActiveItem: (id: string) => void
  removeListItem: (id: string) => void
}
