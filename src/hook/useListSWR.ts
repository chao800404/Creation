import { Emoji, Page, PageConfig } from '@prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { createData, deleteData, fetcher, updateData } from '../utils/fetch'
import cuid from 'cuid'
import produce from 'immer'
import { findIndex } from '../utils/findIndex'
import { TreeDataType } from '../components/drop/treeView/type'
import { getDescendants } from '@minoru/react-dnd-treeview'
import { useLabelStore } from '../store/useLabelStore'

export type ListData = {
  favorite: boolean | undefined
  editable: boolean | undefined
  shouldShow: boolean | undefined
  emoji: {
    id: string
    image: string
  }
}

export type ResDataType = TreeDataType<ListData>

type ListResDataType = {
  data: ResDataType[]
  status: 'success' | 'fail'
}

type UseListSWRResult = {
  data: {
    list?: ResDataType[]
    favorite?: boolean
    editable?: boolean
    emoji?: Emoji['image']
    title?: ResDataType['text'] | null
    parent?: ResDataType['parent'] | number
  }
  isLoading: boolean
  mutateFunction: {
    addNewPage: (parentId?: string) => void
    reorderPage: (
      data: ResDataType[],
      dragSourceId: string,
      dropTargetId: string
    ) => void
    deletePage: (id: string) => void
    updatePageConfig: (
      id: string,
      key: keyof Omit<ListData & { title: string }, 'emoji'>,
      value: boolean | string
    ) => void
    updatePageEmoji: (id: string, src: string) => void
  }
}

type UseListType = (id?: string) => UseListSWRResult

const createNewPage = function (parentId?: string): ResDataType {
  return {
    id: cuid(),
    parent: parentId || 0,
    text: '',
    droppable: true,
    data: {
      editable: true,
      favorite: false,
      shouldShow: false,
      emoji: {
        id: '',
        image: '',
      },
    },
  }
}

const filterList = (id: string, data: ResDataType[]) => {
  const deleteList = [id, ...getDescendants(data, id).map((node) => node.id)]
  return data.filter((node) => !deleteList.includes(node.id))
}

export const useListSWR: UseListType = (pageId) => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR<ListResDataType>(
    `/api/query/queryList`,
    fetcher
  )

  const mutateFunction: UseListSWRResult['mutateFunction'] = {
    addNewPage: (parentId) => {
      const newPage = createNewPage(parentId)
      const newList = produce(data, (draft) => {
        draft?.data?.push(newPage)
      })

      mutate(
        `/api/query/queryList`,
        createData(`addNewPage`, { id: newPage.id as string, parentId }),
        {
          populateCache: (resPage, list: ListResDataType) => {
            return produce(list, (draft) => {
              draft?.data.push(resPage.data)
            })
          },
          revalidate: false,
          optimisticData: newList,
          rollbackOnError: true,
        }
      )
    },

    reorderPage: (list, dragSourceId, dropTargetId) => {
      const newList = produce(data, (draft) => {
        if (draft) {
          const index = draft.data.findIndex((item) => item.id === dragSourceId)
          draft.data[index].parent = dropTargetId
        }
      })

      mutate(
        `/api/query/queryList`,
        updateData(
          `updateListOrder`,
          {
            data: {
              dragSourceId,
              dropTargetId: Number(dropTargetId) === 0 ? null : dropTargetId,
            },
          },
          null
        ),
        {
          populateCache: (resPage, list: ListResDataType) => {
            return produce(list, (draft) => {
              const index = draft.data.findIndex(
                (item) => item.id === resPage.data?.dragSourceId
              )
              draft.data[index].parent =
                resPage.data?.dropTargetId === null
                  ? 0
                  : resPage.data?.dropTargetId
            })
          },
          revalidate: false,
          optimisticData: newList,
          rollbackOnError: true,
        }
      )
    },

    deletePage: (id) => {
      const { removeLabel } = useLabelStore.getState()
      removeLabel(id)
      const deleteList = produce(data, (draft) => {
        if (draft && data) draft.data = filterList(id, data.data)
      })

      mutate(
        `/api/query/queryList`,
        deleteData<{ id: string }>('deletePage', { id }),
        {
          populateCache: (resPage, list: ListResDataType) => {
            return produce(list, (draft) => {
              draft.data = resPage.data
            })
          },

          revalidate: false,
          optimisticData: deleteList,
          rollbackOnError: true,
        }
      )
    },

    updatePageConfig: (id, key, value) => {
      const { updateLabel } = useLabelStore.getState()
      updateLabel(id, key, value)
      const preUpdateItem = produce<ListResDataType>(({ data }) => {
        const index = data.findIndex((item) => item.id === id)
        if (index !== -1 && data) {
          if (key !== 'title') {
            ;(data[index].data as ListData)[key] = value as boolean
          } else if (typeof value === 'string' && key === 'title') {
            data[index].text = value
          }
        }
      })

      mutate(
        `/api/query/queryList`,
        updateData('updatePageConfig', { id, key, value }, null),
        {
          populateCache: (updateItem, list: ListResDataType) => {
            return produce<ListResDataType>(list, ({ data }) => {
              const index = data.findIndex((item) => item.id === id)
              if (index !== -1) {
                if (key !== 'title') {
                  ;(data[index].data as ListData)[key] = value as boolean
                } else if (typeof value === 'string' && key === 'title') {
                  data[index].text = value
                }
              }
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
            ;(data[index].data as ListData).emoji.image = src
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
                ;(data[index].data as ListData).emoji.image = src
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
      favorite: listItem?.data?.favorite,
      editable: listItem?.data?.editable,
      emoji: listItem?.data?.emoji?.image,
      title: listItem?.text,
      parent: listItem?.parent,
    },
    isLoading: !error && !data,
    mutateFunction,
  }
}
