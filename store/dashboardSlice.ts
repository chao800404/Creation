import { StateCreator } from 'zustand'
import { DashboardSlice } from '../types/dashboard'

const initialDashboard = {
  sideLineX: 350,
}

export const createDashboardSlice: StateCreator<DashboardSlice, [], []> = (
  set,
  get
) => ({
  ...initialDashboard,
  setSideLineX: (sideX) => set(() => ({ sideLineX: sideX })),
})
