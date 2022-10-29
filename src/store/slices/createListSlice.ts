import { StateCreator } from 'zustand'
import { proFetch } from '../../utils/fetch'
import { produce } from 'immer'
import { updateData, createData, deleteData } from '../../utils/fetch'
import { List, Cover, Emoji, Profile } from '@prisma/client'
import { CoverSlice } from './createCoverSlice'
import { v4 as uuidv4 } from 'uuid'

export type ListItem = List & {
  cover: Cover
  emoji: Emoji
  prevId?: string
}

type InitialList = {
  id: string
  loading: boolean
  curItem: ListItem | undefined
  list: ListItem[]
}

type ListItemKeys = keyof ListItem

type Action = {
  fetch: () => Promise<void>
  listUpdate: (list: ListItem[], id: Profile['focusId'] | undefined) => void
  stateAndItemUpdateAsync: <T>(
    id: string | undefined,
    key: ListItemKeys,
    value: T
  ) => Promise<void>

  newPageAdd: () => Promise<void>
  selectItemById: (id: string) => void
  pageDelete: (id: string) => Promise<void>
}

export type ResType<T> = {
  status: 'success' | 'fail'
  data: T
}

export type ListSlice = InitialList & Action

const initialList = {
  loading: false,
  id: '',
  curItem: undefined,
  list: [],
  start: false,
}

const findIndex = (state: InitialList, id: string) => {
  if (id) {
    return state.list.findIndex((list) => list.id === id)
  }
}

export const createListSlice: StateCreator<
  ListSlice & CoverSlice,
  [],
  [],
  ListSlice
> = (set, get) => ({
  ...initialList,
  fetch: async () => {
    set((state) => ({ loading: !state.loading }))
    const fetch = async () => proFetch<ResType<ListItem[]>>('queryList')
    await fetch().then((res) => {
      if (res.data && res.data.length > 0) {
        set(
          produce<InitialList>((state) => {
            state.list = res.data || []
            state.loading = false
            state.id = res.data[0].id
            state.curItem = res.data[0]
          })
        )
      }
    })
  },

  listUpdate: (list, id) => {
    set(
      produce<InitialList>((state) => {
        state.list = list || []
        state.curItem = list.find((item) => item.id === id) || list[0]
      })
    )
  },

  selectItemById: (id) => {
    const update = produce<InitialList>((state) => {
      state.id = id
      const item = state.list.find((item) => item.id === id)
      state.curItem = item
    })
    set(update)
  },

  newPageAdd: async () => {
    const newPage = {
      editable: true,
      favorite: false,
      id: uuidv4(),
      title: null,
    }

    const insertItem = produce<InitialList>((state) => {
      state.id = newPage.id
      state.list.push(newPage as ListItem)
      state.curItem = newPage as ListItem
      state.loading = true
    })
    set(insertItem)

    const resData = await createData<ResType<ListItem>>(
      'addNewPage',
      newPage.id
    )

    const { prevId, ...otherData } = resData.data
    const reWriteData = produce<InitialList>((state) => {
      const index = state.list.findIndex((item) => item.id === prevId)
      state.list[index] = otherData
      state.id = otherData.id
      state.curItem = otherData
      state.loading = false
    })
    set(reWriteData)
  },

  stateAndItemUpdateAsync: async (id, key, value) => {
    const curId = id || get().id
    const updateItem = produce<InitialList>((state) => {
      const index = findIndex(state, curId)
      if (index !== -1 && index !== undefined) {
        state.list[index][key] = value as never
        if (state.curItem) state.curItem[key] = value as never
      }
    })
    set(updateItem)
    await updateData('updateList', { id: curId, key, value }, null)
  },

  pageDelete: async (id) => {
    const { id: curItemId, curItem } = get()
    const deleteItem = produce<InitialList>((state) => {
      const index = findIndex(state, id)
      if (index !== -1 && index !== undefined) {
        if (curItemId === id) {
          state.id = ''
        }
        if (curItem && curItem.id === id) {
          console.log(curItem, id)
          state.curItem = undefined
        }
        state.list.splice(index, 1)
      }
    })
    set(deleteItem)
    await deleteData('deletePage', id)
  },
})
