import useSWR, { useSWRConfig } from 'swr'
import { useMemo } from 'react'
import {
  fetcher,
  updateData,
  uploadFile,
  createBlock,
  deleteData,
} from '../utils/fetch'
import { Cover } from '@prisma/client'
import produce from 'immer'
import { findIndex } from '../utils/findIndex'
import { insertIndex } from '../utils/inserIndex'
import cuid from 'cuid'

import { BlockInputType, BlocksNameType, ignoreType } from './type'

type CoverType = Omit<Cover, ignoreType>

type PageResDataType = {
  data: {
    cover: CoverType
    blocks: BlockInputType['blockData'][]
    blockToOrder: string[]
  }
  status: 'success' | 'fail'
}

type UsePageSWRResult = {
  data: {
    cover?: CoverType['image']
    blocks?: BlockInputType['blockData'][]
    blockToOrder?: string[]
  }
  isLoading: boolean
  mutateFunction: {
    uploadCoverImage: (src: string) => void
    uploadCoverImageFile: (file: File) => void
    updateBlock: (
      blockId: string,
      blockContent: BlockInputType['blockData'],
      signal?: AbortSignal | null | undefined,
      revalidate?: boolean
    ) => void
    updateOrder: (reorder: string[]) => void
    addBlock: (index: number, name?: string, type?: BlocksNameType) => void
    deleteBlock: (page_id: string, id: string, index: number) => void
  }
}

type UsePageSWRType = (pageId: string) => UsePageSWRResult

export const usePageSWR: UsePageSWRType = (pageId) => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR<PageResDataType>(
    pageId ? `/api/page/${pageId}` : null,
    fetcher
  )

  const mutateFunction: UsePageSWRResult['mutateFunction'] = {
    uploadCoverImage: (src) => {
      mutate<PageResDataType>(
        `/api/page/${pageId}`,
        (data) => {
          updateData('updateImage', { id: pageId, key: 'cover', src }, null)
          if (data) {
            return produce<PageResDataType>(data, (draft) => {
              draft.data.cover.image = src
            })
          }
        },
        { revalidate: false, rollbackOnError: true }
      )
    },

    uploadCoverImageFile: (file) => {
      const path = URL.createObjectURL(file)
      mutate<PageResDataType>(
        `/api/page/${pageId}`,
        (data) => {
          uploadFile('uploadImage', { id: pageId, file })
          if (data) {
            return produce<PageResDataType>(data, (draft) => {
              draft.data.cover.image = path
            })
          }
        },
        { revalidate: false, rollbackOnError: true }
      )
    },

    addBlock: (index, name = 'Paragraph', type = 'text') => {
      if (!data) return
      const cloneBlockToOrder = [...(data?.data.blockToOrder as string[])]
      const newBlock = {
        name,
        id: cuid(),
        content: '',
        type,
      }
      insertIndex(cloneBlockToOrder, index + 1, newBlock.id)
      const newBlockCreate = produce<PageResDataType>(data, (draft) => {
        draft.data.blockToOrder = cloneBlockToOrder
        insertIndex(draft.data.blocks, index + 1, {
          ...newBlock,
          newBlock: true,
        })
      })

      mutate<PageResDataType>(
        `/api/page/${pageId}`,
        async (data) => {
          await createBlock('pageBlocksUpdateOrCreate', {
            page_id: pageId,
            blockToOrder: cloneBlockToOrder,
            ...newBlock,
          })
          return newBlockCreate
        },
        {
          revalidate: false,
          rollbackOnError: true,
          optimisticData: newBlockCreate,
        }
      )
    },

    updateBlock: (blockId, blockContent, signal, revalidate = false) => {
      if (!data) return
      const cloneBlockToOrder = [...(data?.data.blockToOrder as string[])]
      const updateBlock = produce<PageResDataType>(data, (draft) => {
        draft.data.blockToOrder = cloneBlockToOrder
        findIndex(data.data.blocks, blockId, (index) => {
          draft.data.blocks[index] = {
            ...blockContent,
            newBlock: false,
          }
        })
      })
      mutate<PageResDataType>(
        `/api/page/${pageId}`,
        async (data) => {
          await updateData(
            'pageBlocksUpdateOrCreate',
            {
              page_id: pageId,
              blockToOrder: cloneBlockToOrder,
              ...blockContent,
            },
            signal
          )
          return updateBlock
        },
        {
          revalidate: false,
          rollbackOnError: true,
          optimisticData: updateBlock,
        }
      )
    },

    updateOrder: (reorder) => {
      if (!data) return
      const reorederBlock = produce<PageResDataType>(data, (draft) => {
        draft.data.blockToOrder = reorder
      })
      mutate<PageResDataType>(
        `/api/page/${pageId}`,
        async (data) => {
          await updateData(
            'updateOrder',
            {
              page_id: pageId,
              reorder,
            },
            null
          )
          return reorederBlock
        },
        {
          revalidate: false,
          rollbackOnError: true,
          optimisticData: reorederBlock,
        }
      )
    },

    deleteBlock: (page_id, id, index) => {
      if (!data) return
      const cloneBlockToOrder = [...(data?.data.blockToOrder as string[])]
      const newBlockToOder = cloneBlockToOrder.filter(
        (blockId) => blockId !== id
      )
      const filterBlock = produce<PageResDataType>(data, (draft) => {
        draft.data.blocks = data.data.blocks.filter((block) => block.id !== id)
        draft.data.blockToOrder = newBlockToOder
        draft.data.blocks[index - 1] = {
          ...data.data.blocks[index - 1],
          focus: true,
        }
      })
      mutate<PageResDataType>(
        `/api/page/${pageId}`,
        async (data) => {
          await deleteData('pageBlocksUpdateOrCreate', {
            id,
            type: 'text',
            page_id,
            blockToOrder: newBlockToOder,
          })
          return filterBlock
        },
        {
          revalidate: false,
          rollbackOnError: true,
          optimisticData: filterBlock,
        }
      )
    },
  }

  return {
    data: {
      cover: data?.data?.cover?.image || '',
      blocks: data?.data?.blocks,
      blockToOrder: data?.data?.blockToOrder,
    },
    isLoading: !error && !data,
    mutateFunction,
  }
}
