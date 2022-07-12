import create from 'zustand'
import { createUserSlice } from './userSlice'
import { UserSlice } from '../types/user'
import { createDashboardSlice } from './dashboardSlice'
import { DashboardSlice } from '../types/dashboard'

const useStore = create<UserSlice & DashboardSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createDashboardSlice(...a),
}))

useStore.subscribe(console.log)

export default useStore
