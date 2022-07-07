import create from 'zustand'
import { createUserSlice } from './userSlice'
import { UserSlice } from '../types/user'

const useStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}))

useStore.subscribe(console.log)

export default useStore
