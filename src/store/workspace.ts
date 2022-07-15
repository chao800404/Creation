import { StateCreator } from 'zustand'

import { WorkspaceSlice, InitiallWorkspace } from '../types/workspace'
import { v4 as uuidv4 } from 'uuid'
import produce from 'immer'

const initialWorkspace: InitiallWorkspace = {
  list: [],
  status: {
    activeItem: '',
  },
}

export const createWorkspaceSlice: StateCreator<WorkspaceSlice, [], []> = (
  set,
  get
) => ({
  ...initialWorkspace,

  updateActiveItem: (id) =>
    set(
      produce(({ status }) => {
        status.activeItem = id
      })
    ),
  addToList: (payload = '未命名檔案') =>
    set(
      produce(({ list }: { list: InitiallWorkspace['list'] }) => {
        list.push({
          id: uuidv4(),
          title: payload,
          list: [],
        })
      })
    ),
  removeListItem: (id) =>
    set(
      produce(({ list }: { list: InitiallWorkspace['list'] }) => {
        const listIndex = list.findIndex((item) => item.id === id)
        if (listIndex !== -1) list.splice(listIndex, 1)
      })
    ),
})
