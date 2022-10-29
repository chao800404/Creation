import create from 'zustand'

type InitialUser = {
  indexSignInDisplay: boolean
}

type Action = {
  displayToggle: () => void
}

const initialPopup = {
  indexSignInDisplay: false,
}

export const usePopupStore = create<InitialUser & Action>((set, get) => ({
  ...initialPopup,
  displayToggle: () =>
    set(() => ({
      indexSignInDisplay: !get().indexSignInDisplay,
    })),
}))

process.env.NODE_ENV !== 'production' && usePopupStore.subscribe(console.log)
