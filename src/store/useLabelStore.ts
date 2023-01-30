import { ListData, ResDataType } from './../hook/useListSWR'
import produce, { setAutoFreeze } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { findIndex } from '../utils/findIndex'
import { add } from 'lodash'

type InitialLabelState = {
  labels: ResDataType[]
  curLabel: string
  history: ResDataType[]
}

type Action = {
  addLabel: (item: ResDataType) => void
  removeLabel: (id: string) => void
  setLabels: (labels: ResDataType[]) => void
  updateLabel: (
    id: string,
    key: keyof Omit<ListData & { title: string }, 'emoji'>,
    value: boolean | string
  ) => void

  addHistory: (item: ResDataType) => void
}

const initialLabelState = {
  labels: [],
  curLabel: '',
  history: [],
}

export const useLabelStore = create<InitialLabelState & Action>()(
  persist(
    (set) => ({
      ...initialLabelState,
      addLabel: (item) => {
        set(
          produce<InitialLabelState>((state) => {
            const index = state.labels.findIndex(
              (label) => label.id === item.id
            )
            if (index === -1) state.labels.push(item)
          })
        )
      },
      removeLabel: (id) =>
        set(
          produce<InitialLabelState>((state) => {
            findIndex(state.labels, id, (index) => {
              if (index !== -1) state.labels.splice(index, 1)
            })
          })
        ),
      setLabels: (labels) =>
        set(
          produce<InitialLabelState>((state) => {
            state.labels = labels
          })
        ),
      updateLabel: (id, key, value) =>
        set(
          produce<InitialLabelState>((state) => {
            findIndex(state.labels, id, (index) => {
              if (index !== -1) {
                if (key === 'title' && typeof value === 'string') {
                  state.labels[index].text = value
                } else if (key !== 'title' && typeof value === 'boolean') {
                  ;(state.labels[index].data as Omit<ListData, 'emoji'>)[key] =
                    value
                }
              }
            })
          })
        ),
      addHistory: (item) =>
        set(
          produce<InitialLabelState>((state) => {
            const index = state.labels.findIndex(
              (label) => label.id === item.id
            )
            if (index === -1) {
              const length = state.history.length
              length >= 5
                ? state.history.slice(1).push(item)
                : state.history.push(item)
            }
          })
        ),
    }),
    {
      name: 'lables-content',
    }
  )
)

export const addLabel = (item: ResDataType) => {
  const { addLabel, addHistory } = useLabelStore.getState()
  addHistory(item)
  addLabel(item)
}

setAutoFreeze(false)
