import produce from 'immer'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type InitialPageController = {
  sideWidth: number
  dragStart: boolean
  favoriteTagOpen: boolean
  userPopupOpen: boolean
  dashboardMainWidth: number
  focusId: string | undefined
}

type Action = {
  sideWidthSet: (x: number) => void
  favoriteTagToggle: (toggle: boolean) => void
  userPopupToggle: (toggle: boolean) => void
  dashboardMainWidthSet: (width: number) => void
  onDragSet: (toggle: boolean) => void
  focusIdSet: (id: string) => void
}

const initialPageController = {
  sideWidth: 350,
  dashboardMainWidth: 1135,
  favoriteTagOpen: false,
  userPopupOpen: false,
  dragStart: false,
  focusId: undefined,
}

export const usePageControllerStore = create<InitialPageController & Action>()(
  persist(
    (set) => ({
      ...initialPageController,
      sideWidthSet: (x) =>
        set(
          produce<InitialPageController>((state) => {
            state.sideWidth = x
            state.dragStart = true
          })
        ),
      favoriteTagToggle: (toggle) =>
        set(
          produce<InitialPageController>((state) => {
            state.favoriteTagOpen = toggle
          })
        ),

      userPopupToggle: (toggle) =>
        set(
          produce<InitialPageController>((state) => {
            state.userPopupOpen = toggle
          })
        ),

      dashboardMainWidthSet: (width) =>
        set(
          produce<InitialPageController>((state) => {
            state.dashboardMainWidth = width
            state.dragStart = true
          })
        ),
      onDragSet: (toggle) =>
        set(
          produce<InitialPageController>((state) => {
            state.dragStart = toggle
          })
        ),
      focusIdSet: (id) => {
        set(
          produce<InitialPageController>((state) => {
            state.focusId = id
          })
        )
      },
    }),
    {
      name: 'page-controller',
    }
  )
)

process.env.NODE_ENV !== 'production' &&
  usePageControllerStore.subscribe(console.log)
