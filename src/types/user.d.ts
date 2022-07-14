type UserDetail = username | email | image

export type UserSlice = {
  user: Record<UserDetail, string>
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
