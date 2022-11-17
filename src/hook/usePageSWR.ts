import useSWR, { useSWRConfig } from 'swr'
import { fetcher, updateData, uploadFile, createBlock } from '../utils/fetch'
import { Cover, Emoji, Page } from '@prisma/client'
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
      signal?: AbortSignal | null | undefined
    ) => void
    addBlock: (name?: string, type?: BlocksNameType) => void
  }
}

type UsePageSWRType = (
  pageId: string,
  list?: (Page & { emoji: Emoji })[]
) => UsePageSWRResult

export const usePageSWR: UsePageSWRType = (pageId, list) => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR<PageResDataType>(
    pageId ? `/api/page/${pageId}` : null,
    fetcher
  )

  const mutateFunction: UsePageSWRResult['mutateFunction'] = {
    uploadCoverImage: (src: string) => {
      const uploadCover = produce(data, (draft) => {
        if (draft) {
          draft.data.cover.image = src
        }
      })
      mutate(
        `/api/page/${pageId}`,
        updateData('updateImage', { id: pageId, key: 'cover', src }, null),
        {
          populateCache: (uploadImage, page) => {
            return produce<PageResDataType>(page, (draft) => {
              draft.data.cover.image = uploadImage.data?.image
            })
          },

          revalidate: false,
          optimisticData: uploadCover,
          rollbackOnError: true,
        }
      )
    },

    uploadCoverImageFile: (file) => {
      const path = URL.createObjectURL(file)
      const uploadCover = produce(data, (draft) => {
        if (draft) {
          draft.data.cover.image = path
        }
      })

      mutate(
        `/api/page/${pageId}`,
        uploadFile('uploadImage', { id: pageId, file }),
        {
          populateCache: (uploadImage, page) => {
            return produce<PageResDataType>(page, (draft) => {
              draft.data.cover.image = uploadImage.data?.image
            })
          },

          revalidate: false,
          optimisticData: uploadCover,
          rollbackOnError: true,
        }
      )
    },

    addBlock: (name = 'paragraph', type = 'text') => {
      const newBlock = {
        name,
        id: cuid(),
        content: '',
        index: data ? data?.data?.blocks?.length : 0,
        type,
        newBlock: true,
      }

      const addBlock = produce(data, (draft) => {
        draft?.data.blocks.push({ ...newBlock, newBlock: true })
      })

      mutate(
        `/api/page/${pageId}`,
        createBlock('pageBlocksUpdateOrCreate', {
          page_id: pageId,
          ...newBlock,
        }),
        {
          populateCache: (addBlock, block) => {
            return produce<PageResDataType>(block, (draft) => {
              draft.data.blocks.push({ ...newBlock, newBlock: true })
            })
          },

          revalidate: false,
          optimisticData: addBlock,
          rollbackOnError: true,
        }
      )
    },

    updateBlock: (blockId, blockContent, signal) => {
      const updateBlock = produce(data, (draft) => {
        if (draft) {
          findIndex(draft.data.blocks, blockId, (index) => {
            draft.data.blocks[index] = {
              ...draft.data.blocks[index],
              ...blockContent,
              newBlock: false,
            }
          })
        }
      })
      mutate(
        `/api/page/${pageId}`,
        updateData(
          'pageBlocksUpdateOrCreate',
          { page_id: pageId, ...blockContent },
          signal
        ),
        {
          populateCache: (updateBlock, page) => {
            return produce<PageResDataType>(page, (draft) => {
              findIndex(draft.data.blocks, blockId, (index) => {
                draft.data.blocks[index] = {
                  ...draft.data.blocks[index],
                  ...blockContent,
                  newBlock: false,
                }
              })
            })
          },

          revalidate: false,
          optimisticData: updateBlock,
          rollbackOnError: true,
        }
      )
    },
  }

  // console.log(data?.data.blocks)

  return {
    data: {
      cover: data?.data?.cover.image || '',
      blocks: data?.data?.blocks,
    },
    isLoading: !error && !data,
    mutateFunction,
  }
}
