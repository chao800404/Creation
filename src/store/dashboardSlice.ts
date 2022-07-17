import { StateCreator } from 'zustand'
import { DashboardSlice } from '../types/dashboard'
import { SIDE_BASIC_WIDTH } from '../utils/config'
import { devtools, persist } from 'zustand/middleware'
import produce from 'immer'

const initialDashboard = {
  sideLineX: SIDE_BASIC_WIDTH,
  rightClickId: '',
  coverImageMap: [] as unknown as DashboardSlice['coverImageMap'],
  toggleChangeCoverPopup: false,
  coverImageSrc: '/static/jpg/tailwindcss.jpg',
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

  setCoverImageMap: (imageMap) => {
    set(
      produce((state) => {
        state.coverImageMap = imageMap
      })
    )
  },

  setToggleChangeCoverPopup: (toggle) =>
    set(
      produce((state) => {
        state.toggleChangeCoverPopup = toggle
      })
    ),
  setCoverImageSrc: (src) =>
    set(
      produce((state) => {
        state.coverImageSrc = src
      })
    ),
})
