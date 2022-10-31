import useSWR, { useSWRConfig } from 'swr'
import { createData, fetcher, updateData } from '../utils/fetch'
import cuid from 'cuid'
import { Cover } from '@prisma/client'
import produce from 'immer'

type PageResDataType = {
  data: {
    cover: Cover
  }
  status: 'success' | 'fail'
}

export const usePageSWR = (id?: string) => {
  const { mutate } = useSWRConfig()
  const { data } = useSWR<PageResDataType>(
    id ? `/api/page/${id}` : null,
    fetcher
  )

  const uploadCoverImage = (id: string, src: string) => {
    const uploadCover = produce(data, (draft) => {
      if (draft) {
        draft.data.cover.image = src
      }
    })
    mutate(
      `/api/page/${id}`,
      updateData('updateImage', { id, key: 'cover', src }, null),
      {
        populateCache: (uploadImage, page) => {
          const cloneCache = { ...page }
          cloneCache.data.cover.image = uploadImage.data.image
          return produce<PageResDataType>(page, (draft) => {
            draft.data.cover.image = uploadImage.data.image
          })
        },

        revalidate: false,
        optimisticData: uploadCover,
        rollbackOnError: true,
      }
    )
  }

  return {
    data: {
      cover: data?.data.cover.image,
    },
    uploadCoverImage,
  }
}
