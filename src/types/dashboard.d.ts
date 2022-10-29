export type DashboardSlice = {
  sideLineX: number
  rightClickId: string
  coverImageMap: Record<string, string[]>
  toggleChangeCoverPopup: boolean
  toggleHoverdCover: boolean
  toggleFavoriteBar: boolean
  rename: boolean
  controlCoverStart: Record<string, boolean>
  setSideLineX: (sideLineX: number) => void
  setControlCoverReposition: (toggle: boolean) => void
  setControlChangeCover: (toggle) => void
  setRightClickId: (id: string) => void
  setCoverImageMap: (imageMap: DashboardSlice['coverImageMap'][]) => void
  setToggleHoverdCover: (hovered?: boolean) => void
  setToggleChangeCoverPopup: (toggle: boolean) => void
  setToggleFavoriteBar: (toggle?: boolean) => void
  setRename: (toggle: boolean) => void
}
