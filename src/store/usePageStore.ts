import create from 'zustand'
import produce from 'immer'

type InitialPageStore = {
  focusId: string
  focusBlockId: string
}

type Action = {
  focusIdSet: (id: string) => void
  focusBlockIdSet: (id: string) => void
}

const initialPageStore = {
  focusId: '',
  focusBlockId: '',
}

export const usePageStore = create<InitialPageStore & Action>((set, get) => ({
  ...initialPageStore,
  focusIdSet: (id) =>
    set(
      produce((state) => {
        state.foucsId = id
      })
    ),
  focusBlockIdSet: (id) =>
    set(
      produce((state) => {
        state.focusBlockId = id
      })
    ),
}))

process.env.NODE_ENV !== 'production' && usePageStore.subscribe(console.log)
