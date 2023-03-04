import { create } from 'zustand'

type InitPopupStore = {
  indexSignInDisplay: boolean
}

type Action = {
  displayToggle: () => void
}

const initialPopupStore = {
  indexSignInDisplay: false,
}

export const usePopupStore = create<InitPopupStore & Action>((set, get) => ({
  ...initialPopupStore,
  displayToggle: () =>
    set(() => ({
      indexSignInDisplay: !get().indexSignInDisplay,
    })),
}))

// process.env.NODE_ENV !== 'production' && usePopupStore.subscribe(console.log)
