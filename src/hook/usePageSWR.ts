import useSWR, { useSWRConfig } from 'swr'
import { fetcher, updateData, uploadFile, createBlock } from '../utils/fetch'
import { Cover } from '@prisma/client'
import produce from 'immer'
import { findIndex } from '../utils/findIndex'
import cuid from 'cuid'
import { BlockInputType, BlocksNameType } from '../types/block'

type PageResDataType = {
  data: {
    cover: Cover
    blocks: BlockInputType['blockData'][]
  }
  status: 'success' | 'fail'
}

type UsePageSWRResult = {
  data: {
    cover: Cover['image'] | undefined
    blocks?: BlockInputType['blockData'][]
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
    addBlock: (name?: string, type?: BlocksNameType) => void
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

    addBlock: (name = 'Paragraph', type = 'text') => {
      mutate<PageResDataType>(
        `/api/page/${pageId}`,
        (data) => {
          const newBlock = {
            name,
            id: cuid(),
            content: '',
            index: data ? data?.data?.blocks?.length : 0,
            type,
          }

          createBlock('pageBlocksUpdateOrCreate', {
            page_id: pageId,
            ...newBlock,
          })
          if (data) {
            return produce<PageResDataType>(data, (draft) => {
              draft?.data.blocks.push({ ...newBlock, newBlock: true })
            })
          }
        },
        { revalidate: false, rollbackOnError: true }
      )
    },

    updateBlock: (blockId, blockContent, signal, revalidate = false) => {
      mutate<PageResDataType>(
        `/api/page/${pageId}`,
        (data) => {
          updateData(
            'pageBlocksUpdateOrCreate',
            { page_id: pageId, ...blockContent },
            signal
          )
          if (data) {
            return produce<PageResDataType>(data, (draft) => {
              findIndex(data.data.blocks, blockId, (index) => {
                draft.data.blocks[index] = {
                  ...blockContent,
                  newBlock: false,
                }
              })
            })
          }
        },
        { revalidate: false, rollbackOnError: true }
      )
    },
  }

  return {
    data: {
      cover: data?.data?.cover.image || '',
      blocks: data?.data?.blocks,
    },
    isLoading: !error && !data,
    mutateFunction,
  }
}
