import produce from 'immer'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type InitialLayoutController = {
  sideWidth: number
  dragStart: boolean
  favoriteTagOpen: boolean
  userPopupOpen: boolean
  dashboardMainWidth: number
}

type Action = {
  sideWidthSet: (x: number) => void
  favoriteTagToggle: (toggle: boolean) => void
  userPopupToggle: (toggle: boolean) => void
  dashboardMainWidthSet: (width: number) => void
  onDragSet: (toggle: boolean) => void
}

const initialLayoutController = {
  sideWidth: 350,
  dashboardMainWidth: 1135,
  favoriteTagOpen: false,
  userPopupOpen: false,
  dragStart: false,
}

export const useLayoutControllerStore = create<
  InitialLayoutController & Action
>()(
  persist(
    (set) => ({
      ...initialLayoutController,
      sideWidthSet: (x) =>
        set(
          produce<InitialLayoutController>((state) => {
            state.sideWidth = x
            state.dragStart = true
          })
        ),
      favoriteTagToggle: (toggle) =>
        set(
          produce<InitialLayoutController>((state) => {
            state.favoriteTagOpen = toggle
          })
        ),

      userPopupToggle: (toggle) =>
        set(
          produce<InitialLayoutController>((state) => {
            state.userPopupOpen = toggle
          })
        ),

      dashboardMainWidthSet: (width) =>
        set(
          produce<InitialLayoutController>((state) => {
            state.dashboardMainWidth = width
            state.dragStart = true
          })
        ),
      onDragSet: (toggle) =>
        set(
          produce<InitialLayoutController>((state) => {
            state.dragStart = toggle
          })
        ),
    }),
    {
      name: 'layout-controller',
    }
  )
)

process.env.NODE_ENV !== 'production' &&
  useLayoutControllerStore.subscribe(console.log)
