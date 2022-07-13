export type UserSlice = {
  user: {
    username?: string
    email?: string
    photoUrl?: string
    [key: string]: string
  }
  validity: {
    name: boolean
    email: boolean
  }
  openPopup: boolean
  showError: boolean

  addUser: (name: string, email: string) => void
  toggle: () => void
  updateValidity: () => void
  setShowError: (error: boolean) => void
  clearUser: () => void
}
