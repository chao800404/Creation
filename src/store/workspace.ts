import { StateCreator } from 'zustand'

import { WorkspaceItem, WorkspaceSlice } from '../types/workspace'
import { v4 as uuidv4 } from 'uuid'
import produce from 'immer'

const initialWorkspace: { list: WorkspaceItem[]; item: WorkspaceItem } = {
  list: [],
  item: {
    id: '',
    isHover: false,
    isActive: false,
  },
}

export const createWorkspaceSlice: StateCreator<WorkspaceSlice, [], []> = (
  set,
  get
) => ({
  ...initialWorkspace,
  setWorksapceItemHover: (id) => {
    const list = get().list
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, isHover: !item.isHover }
      } else {
        return item
      }
    })

    set({ list: newList })
  },
  addToList: (payload = '未命名檔案') =>
    set(
      produce(({ list }) => {
        list.push({
          istHover: false,
          isActive: false,
          id: uuidv4(),
          title: payload,
          list: [],
        })
      })
    ),
})

// list: [
//   ...list,
//   {
//     isHover: false,
//     isActive: false,
//     id: uuidv4(),
//     title: payload,
//     list: [],
//   },
// ],
