import { StateCreator } from 'zustand'
import produce from 'immer'
import { ListSlice } from './createListSlice'
import { updateData, createData, uploadFile } from '../../utils/fetch'

type InitialCover = {
  layoutY: number
  coverImage: undefined | string
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
  imageSet: (src: string) => void
}

export type CoverSlice = InitialCover & Action

const initialCover = {
  layoutY: 50,
  coverImage: undefined,
  controlCoverStart: {
    reposition: false,
    changCover: false,
  },
  coverImageMap: [] as unknown as InitialCover['coverImageMap'],
  popupDisplay: false,
  isHovered: false,
}

export const createCoverSlice: StateCreator<
  CoverSlice & ListSlice,
  [],
  [],
  CoverSlice
> = (set, get) => ({
  ...initialCover,
  layoutYSet: (y) =>
    set(() => ({
      layoutY: y,
    })),

  imageSet: async (src) => {
    set(
      produce((state: InitialCover) => {
        state.coverImage = src
      })
    )
  },

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
})
