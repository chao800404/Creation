import { StateCreator } from 'zustand'
import { UserSlice } from '../types/user'

const initialUser = {
  user: {
    username: '',
    email: '',
    photoUrl: '',
  },
  togglePopup: false,
}

export const createUserSlice: StateCreator<UserSlice, [], []> = (set) => ({
  user: initialUser.user,
  togglePopup: initialUser.togglePopup,
  addUser: (newUser) => set(({ user }) => ({ user: { ...user, ...newUser } })),
  toggle: () =>
    set((state) => ({
      togglePopup: !state.togglePopup,
    })),
})
