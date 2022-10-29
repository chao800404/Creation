import {
  createCoverSlice,
  createListSlice,
  CoverSlice,
  ListSlice,
} from './slices/index'
import create from 'zustand'

export const usePageStore = create<CoverSlice & ListSlice>()((...a) => ({
  ...createListSlice(...a),
  ...createCoverSlice(...a),
}))

usePageStore.subscribe(console.log)
