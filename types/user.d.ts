export type UserSlice = {
  user: {
    username: string
    email: string
    photoUrl?: string
  }
  togglePopup: boolean

  addUser: (user: UserSlice['user']) => void
  toggle: () => void
}
