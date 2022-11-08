import { Emoji, List } from '@prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { createData, deleteData, fetcher, updateData } from '../utils/fetch'
import cuid from 'cuid'
import produce from 'immer'

type ListResDataType = {
  data: (List & { emoji: Emoji })[]
  status: 'success' | 'fail'
}

type UseListSWRResult = {
  data: {
    list: (List & { emoji: Emoji })[] | undefined
    favorite: boolean | undefined
    editable: boolean | undefined
    emoji: Emoji['image'] | undefined
    title: List['title'] | undefined
  }
  isLoading: boolean
  mutateFution: {
    addNewList: () => void
    deleteList: (id: string) => void
    updateListItem: (
      id: string,
      key: keyof List,
      value: boolean | string
    ) => void
    updateListEmoji: (id: string, src: string) => void
  }
}

type UseListType = (id?: string) => UseListSWRResult

export const useListSWR: UseListType = (id) => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR<ListResDataType>(
    `/api/query/queryList`,
    fetcher
  )

  const mutateFution: UseListSWRResult['mutateFution'] = {
    addNewList: () => {
      const newPage = {
        editable: true,
        favorite: false,
        id: cuid(),
        title: null,
      }

      const addList = produce(data, (draft) => {
        if (draft) {
          draft?.data.push(newPage as List & { emoji: Emoji })
        }
      })

      mutate(`/api/query/queryList`, createData(`addNewPage`, newPage.id), {
        populateCache: (resPage, list: ListResDataType) => {
          return produce(list, (draft) => {
            draft?.data.push(resPage.data)
          })
        },
        revalidate: false,
        optimisticData: addList,
        rollbackOnError: true,
      })
    },
    deleteList: (id) => {
      const deleteList = produce(data, (draft) => {
        if (draft) {
          draft.data = draft.data.filter((item) => item.id !== id)
        }
      })

      mutate(`/api/query/queryList`, deleteData('deletePage', id), {
        populateCache: (deletePage, list: ListResDataType) => {
          return produce(list, (draft) => {
            draft.data = draft.data.filter((item) => item.id !== id)
          })
        },

        revalidate: false,
        optimisticData: deleteList,
        rollbackOnError: true,
      })
    },
    updateListItem: (id, key, value) => {
      const preUpdateItem = produce<ListResDataType>(({ data }) => {
        if (data) {
          const index = data.findIndex((item) => item.id === id)
          if (index !== -1 && index !== undefined) {
            data[index][key] = value as never
          }
        }
      })

      mutate(
        `/api/query/queryList`,
        updateData('updateList', { id, key, value }, null),
        {
          populateCache: (updateItem, list: ListResDataType) => {
            return produce(list, ({ data }) => {
              const index = data.findIndex((item) => item.id === id)
              if (index !== -1 && index !== undefined) {
                data[index][key] = updateItem.data[key] as never
              }
            })
          },
          revalidate: false,
          optimisticData: preUpdateItem,
          rollbackOnError: true,
        }
      )
    },

    updateListEmoji: (id, src) => {
      const preUpdateEmoji = produce<ListResDataType>(({ data }) => {
        if (data) {
          const index = data.findIndex((item) => item.id === id)
          if (index !== -1 && index !== undefined) {
            data[index].emoji.image = src
          }
        }
      })

      mutate(
        '/api/query/queryList',
        updateData('updateImage', { id, key: 'emoji', src }, null),
        {
          populateCache: (updateEmoji, list: ListResDataType) => {
            return produce(list, ({ data }) => {
              const index = data.findIndex((item) => item.id === id)
              if (index !== -1 && index !== undefined) {
                data[index].emoji.image = updateEmoji.data.image
              }
            })
          },
          revalidate: false,
          optimisticData: preUpdateEmoji,
          rollbackOnError: true,
        }
      )
    },
  }

  const listItem = data?.data?.find((item) => item.id === id)

  return {
    data: {
      list: data?.data,
      favorite: listItem?.favorite,
      editable: listItem?.editable,
      emoji: listItem?.emoji?.image,
      title: listItem?.title,
    },
    isLoading: !error && !data,
    mutateFution,
  }
}
