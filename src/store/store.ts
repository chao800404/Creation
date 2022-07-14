import create from 'zustand'
import { createUserSlice } from './userSlice'
import { UserSlice } from '../types/user'
import { createDashboardSlice } from './dashboardSlice'
import { DashboardSlice } from '../types/dashboard'
import { createWorkspaceSlice } from './workspace'
import { WorkspaceSlice } from '../types/workspace'
import { devtools, persist } from 'zustand/middleware'

const useStore = create<UserSlice & DashboardSlice & WorkspaceSlice>()(
  (...a) => ({
    ...createUserSlice(...a),
    ...createDashboardSlice(...a),
    ...createWorkspaceSlice(...a),
  })
)

useStore.subscribe(console.log)

export default useStore
