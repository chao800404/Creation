import { create } from 'zustand'
import produce from 'immer'

export type StatusType = 'success' | 'error' | 'pending' | 'normal' | undefined

type InitialStatusStore = {
  status: StatusType
  message: null | string | undefined
}

type Action = {
  statusSet: (
    status: StatusType,
    message: InitialStatusStore['message']
  ) => void
}

const initialStatusStore = {
  status: undefined,
  message: '',
}

export const useStatusStore = create<InitialStatusStore & Action>(
  (set, get) => ({
    ...initialStatusStore,

    statusSet: (status, message = '') =>
      set(
        produce((state) => {
          state.status = status
          state.message = message
        })
      ),
  })
)

// process.env.NODE_ENV !== 'production' && useStatusStore.subscribe(console.log)
