import create from 'zustand'
import { validateEamil, validateUserName } from '../lib/validator'
import produce from 'immer'

type InitialUser = {
  user: {
    [key: string]: string
  }
  validity: {
    email: boolean
    name: boolean
  }
  showError: boolean
}

type Action = {
  userSet: (name: string, value: string) => void
  userClear: () => void
  updateValidity: () => void
  showErrorSet: (error: boolean) => void
}

const initialUser = {
  user: {
    name: '',
    email: '',
    image: '',
  },
  validity: {
    email: false,
    name: false,
  },
  openPopup: false,
  showError: false,
}

export const useUserStore = create<InitialUser & Action>((set, get) => ({
  ...initialUser,
  userSet: (name: string, value: string) =>
    set(
      produce(({ user }) => {
        user[name] = value
      })
    ),
  updateValidity: () => {
    const { user } = get()
    set(() => ({
      validity: {
        name: validateUserName((user.name as string) || '').validity,
        email: validateEamil((user.email as string) || '').validity,
      },
    }))
  },
  showErrorSet: (error) =>
    set(() => ({
      showError: error,
    })),

  userClear: () =>
    set(
      produce(({ user }) => {
        user.name = ''
        user.email = ''
        user.image = ''
      })
    ),
}))

process.env.NODE_ENV !== 'production' && useUserStore.subscribe(console.log)
