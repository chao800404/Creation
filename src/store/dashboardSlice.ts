import { StateCreator } from 'zustand'
import { DashboardSlice, DashboardType } from '../types/dashboard'
import { SIDE_BASIC_WIDTH } from '../utils/config'
import { devtools, persist } from 'zustand/middleware'
import produce from 'immer'

const initialDashboard: DashboardType = {
  sideLineX: SIDE_BASIC_WIDTH,
  controlCoverStart: {
    reposition: false,
    changCover: false,
  },
  rightClickId: '',
  coverImageMap: [] as unknown as DashboardSlice['coverImageMap'],
  toggleChangeCoverPopup: false,
  toggleHoverdCover: false,
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

  setControlCoverReposition: (toggle) => {
    set(
      produce((state) => {
        state.controlCoverStart.reposition = toggle
      })
    )
  },
  setControlChangeCover: (toggle) => {
    set(
      produce((state) => {
        state.controlCoverStart.changCover = toggle
      })
    )
  },
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

  setToggleHoverdCover: (hovered) => {
    set(
      produce((state) => {
        if (
          state.controlCoverStart.reposition ||
          state.controlCoverStart.changCover
        )
          return
        if (typeof hovered === 'boolean') {
          state.toggleHoverdCover = hovered
        } else {
          state.toggleHoverdCover = !state.toggleHoverdCover
        }
      })
    )
  },

  setToggleChangeCoverPopup: (toggle) =>
    set(
      produce((state) => {
        state.toggleChangeCoverPopup = toggle
      })
    ),
})
