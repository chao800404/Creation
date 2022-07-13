import { StateCreator } from 'zustand'
import { UserSlice } from '../types/user'
import { validateEamil, validateUserName } from '../lib/validator'

const initialUser = {
  user: {
    username: '',
    email: '',
    photoUrl: '',
  },
  validity: {
    email: false,
    name: false,
  },
  openPopup: false,
  showError: false,
}

export const createUserSlice: StateCreator<UserSlice, [], []> = (set, get) => ({
  ...initialUser,
  addUser: (name: string, value: string) => {
    const { user } = get()
    user[name] = value
    set({ user })
  },
  toggle: () =>
    set(() => ({
      openPopup: !get().openPopup,
    })),
  updateValidity: () => {
    const { user } = get()
    set(() => ({
      validity: {
        name: validateUserName((user.username as string) || '').validity,
        email: validateEamil((user.email as string) || '').validity,
      },
    }))
  },
  setShowError: (error) =>
    set(() => ({
      showError: error,
    })),

  clearUser: () =>
    set(() => ({
      user: {
        username: '',
        email: '',
        photoUrl: '',
      },
      validity: {
        email: false,
        name: false,
      },
      showError: false,
    })),
})
