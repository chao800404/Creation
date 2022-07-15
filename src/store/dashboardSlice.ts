import { StateCreator } from 'zustand'
import { DashboardSlice } from '../types/dashboard'
import { SIDE_BASIC_WIDTH } from '../utils/config'
import { devtools, persist } from 'zustand/middleware'
import produce from 'immer'

const initialDashboard = {
  sideLineX: SIDE_BASIC_WIDTH,
  rightClickId: '',
}

export const createDashboardSlice: StateCreator<DashboardSlice, [], []> = (
  set,
  get
) => ({
  ...initialDashboard,
  setSideLineX: (sideX) =>
    set(
      produce((state) => {
        state.sideLineX = sideX
      })
    ),
  setRightClickId: (id) =>
    set(
      produce((state) => {
        state.rightClickId = id
      })
    ),
})
