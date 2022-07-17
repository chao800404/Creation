export type DashboardSlice = {
  sideLineX: number
  rightClickId: string
  coverImageMap: Record<string, string[]>
  toggleChangeCoverPopup: boolean
  coverImageSrc: string

  setSideLineX: (sideX: number) => void
  setRightClickId: (id: string) => void
  setCoverImageMap: (imageMap: DashboardSlice['coverImage']) => void
  setToggleChangeCoverPopup: (toggle: boolean) => void
  setCoverImageSrc: (src: string) => void
}
