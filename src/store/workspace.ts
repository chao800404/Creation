import { StateCreator } from 'zustand'

import {
  WorkspaceSlice,
  InitiallWorkspace,
  WorkspaceItem,
} from '../types/workspace'
import { v4 as uuidv4 } from 'uuid'
import produce from 'immer'

const findIndex = (state: WorkspaceSlice, activeId: string | undefined) => {
  if (activeId) {
    return state.list.findIndex((list) => list.id === activeId)
  }
}

const initialWorkspace: InitiallWorkspace = {
  list: [],
  activeItem: null,
}

export const createWorkspaceSlice: StateCreator<WorkspaceSlice, [], []> = (
  set,
  get
) => ({
  ...initialWorkspace,

  updateActiveItem: (ctx) => {
    const updateItem = produce((state: WorkspaceSlice) => {
      if (typeof ctx === 'string') {
        const index = findIndex(state, ctx)
        if (index !== -1 && index !== undefined)
          state.activeItem = state.list[index]
      }
      if (typeof ctx === 'object') {
        state.activeItem = ctx
      }
    })

    set(updateItem)
  },

  addToList: (payload = '未命名檔案') => {
    const id = uuidv4()
    const item = {
      id: id,
      title: payload,
      emoji: '',
      list: [],
      coverImageSrc: undefined,
    }
    const addList = produce(({ list }: { list: WorkspaceItem[] }) => {
      list.push(item)
    })

    get().updateActiveItem(item)
    set(addList)
  },

  updateListTitle: (title) => {
    const activeId = get().activeItem?.id
    const updateItem = produce((state: WorkspaceSlice) => {
      const index = findIndex(state, activeId)
      if (index !== -1 && index !== undefined) {
        state.list[index].title = title
        get().updateActiveItem(state.list[index])
      }
    })
    set(updateItem)
  },

  removeListItem: (id) =>
    set(
      produce(({ list }: { list: InitiallWorkspace['list'] }) => {
        const listIndex = list.findIndex((item) => item.id === id)
        if (listIndex !== -1) list.splice(listIndex, 1)
      })
    ),

  setCoverImageSrc: (src) => {
    const activeId = get().activeItem?.id

    const updateItem = produce((state: WorkspaceSlice) => {
      const index = findIndex(state, activeId)
      if (index !== -1 && index !== undefined) {
        state.list[index].coverImageSrc = src
        get().updateActiveItem(state.list[index])
      }
    })

    set(updateItem)
  },

  setEmoji: (path) => {
    const activeId = get().activeItem?.id
    const updateItem = produce((state: WorkspaceSlice) => {
      const index = findIndex(state, activeId)
      if (index !== -1 && index !== undefined) {
        state.list[index].emoji = path
        get().updateActiveItem(state.list[index])
      }
    })

    set(updateItem)
  },

  removeEmoji: () =>
    set(
      produce((state) => {
        state.emoji = ''
      })
    ),
})

// state.coverImageSrc = src
