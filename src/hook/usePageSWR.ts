import { MyValue } from '@/components/edtior/plateTypes'
import useSWR, { useSWRConfig } from 'swr'
import { useMemo } from 'react'
import {
  fetcher,
  updateData,
  uploadFile,
  createBlock,
  deleteData,
} from '../utils/fetch'
import { Content, Cover } from '@prisma/client'
import produce from 'immer'
import { findIndex } from '../utils/findIndex'
import { insertIndex } from '../utils/inserIndex'
import cuid from 'cuid'

import {
  BlockInputType,
  BlocksNameType,
  ignoreType,
  PageSWRResult,
} from './type'

type CoverType = Omit<Cover, ignoreType>

type PageResDataType = {
  data: {
    cover: {
      id: string
      image: string
    }
    nodes: MyValue
  }
  status: 'success' | 'fail'
}

// type UsePageSWRType = (pageId: string) => UsePageSWRResult

export const usePageSWR = (pageId: string) => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR<PageResDataType>(
    pageId ? `/api/page/${pageId}` : null,
    fetcher
  )

  const mutateFunction: PageSWRResult<MyValue>['mutateFunction'] = {
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

    updateNodes: ({ pageId, value }) => {
      if (data) {
        const update = produce<PageResDataType>(data, (draft) => {
          draft.data.nodes = value
        })

        mutate<PageResDataType>(
          `/api/page/${pageId}`,
          (data) => {
            updateData('syncContent', { data: value, id: pageId }, null)
            return update
          },
          {
            revalidate: false,
            rollbackOnError: true,
            optimisticData: update,
          }
        )
      }
    },

    updateOrder: (reorder) => {
      // if (!data) return
      // const reorederBlock = produce<PageResDataType>(data, (draft) => {
      //   draft.data.blockToOrder = reorder
      // })
      // mutate<PageResDataType>(
      //   `/api/page/${pageId}`,
      //   async (data) => {
      //     await updateData(
      //       'updateOrder',
      //       {
      //         page_id: pageId,
      //         reorder,
      //       },
      //       null
      //     )
      //     return reorederBlock
      //   },
      //   {
      //     revalidate: false,
      //     rollbackOnError: true,
      //     optimisticData: reorederBlock,
      //   }
      // )
    },

    deleteBlock: (page_id, id) => {
      // if (!data) return
      // const cloneBlockToOrder = [...(data?.data.blockToOrder as string[])]
      // const newBlockToOder = cloneBlockToOrder.filter(
      //   (blockId) => blockId !== id
      // )
      // const filterBlock = produce<PageResDataType>(data, (draft) => {
      //   draft.data.blocks = data.data.blocks.filter((block) => block.id !== id)
      //   draft.data.blockToOrder = newBlockToOder
      //   // draft.data.blocks[index - 1] = {
      //   //   ...data.data.blocks[index - 1],
      //   //   focus: true,
      //   // }
      // })
      // mutate<PageResDataType>(
      //   `/api/page/${pageId}`,
      //   async (data) => {
      //     await deleteData('pageBlocksUpdateOrCreate', {
      //       id,
      //       type: 'text',
      //       page_id,
      //       blockToOrder: newBlockToOder,
      //     })
      //     return filterBlock
      //   },
      //   {
      //     revalidate: false,
      //     rollbackOnError: true,
      //     optimisticData: filterBlock,
      //   }
      // )
    },
  }

  return {
    data: {
      cover: data?.data?.cover?.image || '',
      content: data?.data?.nodes,
    },
    isLoading: !error && !data,
    mutateFunction,
  }
}
