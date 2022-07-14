import { StateCreator } from 'zustand'
import { DashboardSlice } from '../types/dashboard'
import { SIDE_BASIC_WIDTH } from '../utils/config'
import { devtools, persist } from 'zustand/middleware'
import { WorkspaceItem, WorkspaceSlice } from '../types/workspace'
import { v4 as uuidv4 } from 'uuid'

const id = uuidv4()

const initialWorkspace: { list: WorkspaceItem[]; item: WorkspaceItem } = {
  list: [],
  item: {
    id: '',
    isHover: false,
    isActive: false,
    title: '',
    list: [],
  },
}

export const createWorkspaceSlice: StateCreator<WorkspaceSlice, [], []> = (
  set,
  get
) => ({
  ...initialWorkspace,
  setWorksapceItemHover: () => set(),
  addToList: (payload = '未命名檔案') =>
    set(({ list, item }) => ({
      list: [...list, { ...item, id, title: payload }],
    })),
})
