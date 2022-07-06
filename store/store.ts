import create from 'zustand'
import { UserSlice, createUserSlice } from './userSlice'

const useStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}))

useStore.subscribe(console.log)

export default useStore
