import useSWR, { useSWRConfig } from 'swr'
import { fetcher, updateData, uploadFile, createBlock } from '../utils/fetch'
import { Cover } from '@prisma/client'
import produce from 'immer'
import { findIndex } from '../utils/findIndex'
import cuid from 'cuid'

type PageResDataType = {
  data: {
    cover: Cover
    blocks: BlocksType[]
  }
  status: 'success' | 'fail'
}

type BlocksType = {
  id: string
  name: string
  index: number
  content: string
}

type BlocksNameType = 'text'

type UsePageSWRResult = {
  data: {
    cover: Cover['image'] | undefined
    blocks?: BlocksType[]
  }
  isLoading: boolean
  mutateFunction: {
    uploadCoverImage: (src: string) => void
    uploadCoverImageFile: (file: File) => void
    updateBlock: (
      blockId: string,
      blockContent: BlocksType,
      signal?: AbortSignal | null | undefined
    ) => void
    addBlock: (name: BlocksNameType) => void
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

    addBlock: (name) => {
      const newBlock = {
        name,
        id: cuid(),
        content: '',
        index: data ? data?.data?.blocks?.length + 1 : 0,
      }

      const addBlock = produce(data, (draft) => {
        draft?.data.blocks.push(newBlock)
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
              draft.data.blocks.push(addBlock.data)
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
                  ...updateBlock.data,
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
