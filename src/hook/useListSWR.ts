import { Emoji, Page } from '@prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { createData, deleteData, fetcher, updateData } from '../utils/fetch'
import cuid from 'cuid'
import produce from 'immer'
import { findIndex } from '../utils/findIndex'

type ListResDataType = {
  data: (Page & { emoji: Emoji })[]
  status: 'success' | 'fail'
}

type UseListSWRResult = {
  data: {
    list: (Page & { emoji: Emoji })[] | undefined
    favorite: boolean | undefined
    editable: boolean | undefined
    emoji: Emoji['image'] | undefined
    title: Page['title'] | undefined
  }
  isLoading: boolean
  mutateFunction: {
    addNewPage: () => void
    deletePage: (id: string) => void
    updatePageItem: (
      id: string,
      key: keyof Page,
      value: boolean | string
    ) => void
    updatePageEmoji: (id: string, src: string) => void
  }
}

type UseListType = (id?: string) => UseListSWRResult

export const useListSWR: UseListType = (pageId) => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR<ListResDataType>(
    `/api/query/queryList`,
    fetcher
  )

  const mutateFunction: UseListSWRResult['mutateFunction'] = {
    addNewPage: () => {
      const newPage = {
        editable: true,
        favorite: false,
        id: cuid(),
        title: null,
      }

      const addList = produce(data, (draft) => {
        if (draft) {
          draft?.data.push(newPage as Page & { emoji: Emoji })
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
    deletePage: (id) => {
      const deleteList = produce(data, (draft) => {
        if (draft) {
          draft.data = draft.data.filter((item) => item.id !== id)
        }
      })

      mutate(
        `/api/query/queryList`,
        deleteData<{ id: string }>('deletePage', { id }),
        {
          populateCache: (deletePage, list: ListResDataType) => {
            return produce(list, (draft) => {
              draft.data = draft.data.filter((item) => item.id !== id)
            })
          },

          revalidate: false,
          optimisticData: deleteList,
          rollbackOnError: true,
        }
      )
    },
    updatePageItem: (id, key, value) => {
      const preUpdateItem = produce<ListResDataType>(({ data }) => {
        if (data) {
          findIndex(data, id, (index) => {
            data[index][key] = value as never
          })
        }
      })

      mutate(
        `/api/query/queryList`,
        updateData('updateList', { id, key, value }, null),
        {
          populateCache: (updateItem, list: ListResDataType) => {
            return produce(list, ({ data }) => {
              findIndex(data, id, (index) => {
                data[index][key] = updateItem.data[key] as never
              })
            })
          },
          revalidate: false,
          optimisticData: preUpdateItem,
          rollbackOnError: true,
        }
      )
    },

    updatePageEmoji: (id, src) => {
      const preUpdateEmoji = produce<ListResDataType>(({ data }) => {
        if (data) {
          findIndex(data, id, (index) => {
            data[index].emoji.image = src
          })
        }
      })

      mutate(
        '/api/query/queryList',
        updateData('updateImage', { id, key: 'emoji', src }, null),
        {
          populateCache: (updateEmoji, list: ListResDataType) => {
            return produce(list, ({ data }) => {
              findIndex(data, id, (index) => {
                data[index].emoji.image = updateEmoji.data.image
              })
            })
          },
          revalidate: false,
          optimisticData: preUpdateEmoji,
          rollbackOnError: true,
        }
      )
    },
  }

  const listItem = data?.data?.find((item) => item?.id === pageId)

  return {
    data: {
      list: data?.data,
      favorite: listItem?.favorite,
      editable: listItem?.editable,
      emoji: listItem?.emoji?.image,
      title: listItem?.title,
    },
    isLoading: !error && !data,
    mutateFunction,
  }
}
