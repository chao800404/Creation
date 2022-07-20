import { StateCreator } from 'zustand'
import { UserSlice, User } from '../types/user'
import { validateEamil, validateUserName } from '../lib/validator'
import produce from 'immer'

const initialUser = {
  user: {
    name: '',
    email: '',
    image: '',
  } as User,
  validity: {
    email: false,
    name: false,
  },
  openPopup: false,
  showError: false,
}

export const createUserSlice: StateCreator<UserSlice, [], []> = (set, get) => ({
  ...initialUser,
  addUser: (name: string, value: string) =>
    set(
      produce(({ user }) => {
        user[name] = value
      })
    ),
  toggle: () =>
    set(() => ({
      openPopup: !get().openPopup,
    })),
  updateValidity: () => {
    const { user } = get()
    set(() => ({
      validity: {
        name: validateUserName((user.name as string) || '').validity,
        email: validateEamil((user.email as string) || '').validity,
      },
    }))
  },
  setShowError: (error) =>
    set(() => ({
      showError: error,
    })),

  clearUser: () =>
    set(
      produce(({ user }) => {
        user.name = ''
        user.email = ''
        user.image = ''
      })
    ),
})
