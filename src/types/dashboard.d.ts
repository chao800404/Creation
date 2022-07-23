export interface DashboardType {
  sideLineX: number
  rightClickId: string
  coverImageMap: Record<string, string[]>
  toggleChangeCoverPopup: boolean
  toggleHoverdCover: boolean
  controlCoverStart: Record<string, boolean>
}

export interface DashboardSlice extends DashboardType {
  setSideLineX: (sideX: number) => void
  setRightClickId: (id: string) => void
  setCoverImageMap: (imageMap: DashboardSlice['coverImage']) => void
  setToggleChangeCoverPopup: (toggle: boolean) => void

  setToggleHoverdCover: (hovered?: boolean) => void
  setControlCoverReposition: (toggle: boolean) => void
  setControlChangeCover: (toggle: boolean) => void
}
