export type WorkspaceItem = {
  id: string
  isHover?: boolean
  isActive?: boolean
  title?: string
  list?: WorkspaceItem[]
}

export type WorkspaceSlice = {
  list: WorkspaceItem[]
  item: WorkspaceItem
  setWorksapceItemHover: () => void
  addToList: (payload?: string) => void
}
