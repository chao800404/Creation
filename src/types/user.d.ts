type User = Record<'name' | 'email' | 'image', string>

export type UserSlice = {
  user: User
  validity: {
    name: boolean
    email: boolean
  }
  openPopup: boolean
  showError: boolean

  addUser: (key: string, value: string) => void
  toggle: () => void
  updateValidity: () => void
  setShowError: (error: boolean) => void
  clearUser: () => void
}
