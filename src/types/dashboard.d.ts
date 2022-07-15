export type DashboardSlice = {
  sideLineX: number
  rightClickId: string

  setSideLineX: (sideX: number) => void
  setRightClickId: (id: string) => void
}
