import { StateCreator } from 'zustand'
import { DashboardSlice } from '../types/dashboard'
import { SIDE_BASIC_WIDTH } from '../utils/config'
import { devtools, persist } from 'zustand/middleware'

const initialDashboard = {
  sideLineX: SIDE_BASIC_WIDTH,
}

export const createDashboardSlice: StateCreator<DashboardSlice, [], []> = (
  set,
  get
) => ({
  ...initialDashboard,
  setSideLineX: (sideX) => set(() => ({ sideLineX: sideX })),
})
