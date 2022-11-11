import useSWR, { useSWRConfig } from 'swr'
import { fetcher, updateData, uploadFile } from '../utils/fetch'
import { Cover, Text } from '@prisma/client'
import produce from 'immer'

type PageResDataType = {
  data: {
    cover: Cover
    blocks: Text[]
  }
  status: 'success' | 'fail'
}

type BlockUpdateType = {
  key: string
  index?: number
  content: string
  block_id: string
}

type UsePageSWRResult = {
  data: {
    cover: Cover['image'] | undefined
    blocks?: Text[]
  }
  isLoading: boolean
  mutateFunction: {
    uploadCoverImage: (src: string) => void
    uploadCoverImageFile: (file: File) => void
    updateBlock: (blockId: string, blockContent: BlockUpdateType) => void
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

    updateBlock: (blockId, blockContent) => {
      // console.log(blockContent)
      const updateBlock = produce(data, (draft) => {
        if (draft) {
          const index = draft.data.blocks.findIndex(
            (block) => block.id === blockId
          )
          if (index !== -1 && index !== undefined) {
            draft.data.blocks[index] = {
              ...draft.data.blocks[index],
              ...blockContent,
            }
          }
        }
      })
      mutate(
        `/api/page/${pageId}`,
        updateData(
          'pageBlocksUpdateOrCreate',
          { page_id: pageId, ...blockContent },
          null
        ),
        {
          populateCache: (updateBlock, page) => {
            return produce<PageResDataType>(page, (draft) => {
              const index = draft.data.blocks.findIndex(
                (block) => block.id === blockId
              )
              if (index !== -1 && index !== undefined) {
                draft.data.blocks[index] = {
                  ...draft.data.blocks[index],
                  ...updateBlock,
                }
              }
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
