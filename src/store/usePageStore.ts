import create from 'zustand'
import produce from 'immer'

type InitialPageStore = {
  focusId: string
}

type Action = {
  focusIdSet: (id: string) => void
}

const initialPageStore = {
  focusId: '',
}

export const usePageStore = create<InitialPageStore & Action>((set, get) => ({
  ...initialPageStore,
  focusIdSet: (id) =>
    set(
      produce((state) => {
        state.foucsId = id
      })
    ),
}))

process.env.NODE_ENV !== 'production' && usePageStore.subscribe(console.log)
