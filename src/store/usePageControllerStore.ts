import produce from 'immer'
import { CSSProperties } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type InitialPageController = {
  sideWidth: number
  favoriteTagHeight: number
  dragStart: boolean
  favoriteTagOpen: boolean
  userPopupOpen: boolean
  dashboardMainWidth: number
  focusId: string | undefined
  cursorType: CSSProperties['cursor']
}

type Action = {
  sideWidthSet: (x: number) => void
  favoriteTagHeightSet: (y: number) => void
  favoriteTagToggle: (toggle: boolean) => void
  userPopupToggle: (toggle: boolean) => void
  dashboardMainWidthSet: (width: number) => void
  onDragSet: (toggle: boolean) => void
  focusIdSet: (id: string) => void
  cursorTypeSet: (cursor: CSSProperties['cursor']) => void
}

const initialPageController = {
  sideWidth: 350,
  favoriteTagHeight: 150,
  dashboardMainWidth: 1135,
  favoriteTagOpen: false,
  userPopupOpen: false,
  dragStart: false,
  focusId: undefined,
  cursorType: 'default',
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

      favoriteTagHeightSet: (y) =>
        set(
          produce<InitialPageController>((state) => {
            state.favoriteTagHeight = y
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
      cursorTypeSet: (cursor) => {
        set(
          produce<InitialPageController>((state) => {
            state.cursorType = cursor
          })
        )
      },
    }),
    {
      name: 'page-controller',
    }
  )
)
