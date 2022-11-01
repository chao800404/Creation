import create, { StateCreator } from 'zustand'
import produce from 'immer'

type InitialCover = {
  layoutY: number

  controlCoverStart: {
    reposition: boolean
    changCover: boolean
  }
  coverImageMap: {
    [key: string]: string[]
  }
  isHovered: boolean
  popupDisplay: boolean
}

type Action = {
  layoutYSet: (y: number) => void
  controlCoverRepositionSet: (toggle: boolean) => void
  controlChangeCoverSet: (toggle: boolean) => void
  coverImageMapSet: (map: InitialCover['coverImageMap']) => void
}

export type CoverStore = InitialCover & Action

const initialCover = {
  layoutY: 50,
  controlCoverStart: {
    reposition: false,
    changCover: false,
  },
  coverImageMap: [] as unknown as InitialCover['coverImageMap'],
  popupDisplay: false,
  isHovered: false,
}

export const useCoverStore = create<InitialCover & Action>((set, get) => ({
  ...initialCover,
  layoutYSet: (y) =>
    set(() => ({
      layoutY: y,
    })),

  controlCoverRepositionSet: (toggle) => {
    set(
      produce((state) => {
        state.controlCoverStart.reposition = toggle
      })
    )
  },

  controlChangeCoverSet: (toggle) => {
    set(
      produce((state) => {
        state.controlCoverStart.changCover = toggle
      })
    )
  },

  coverImageMapSet: (imageMap) => {
    set(
      produce((state) => {
        state.coverImageMap = imageMap
      })
    )
  },
}))
