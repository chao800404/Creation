import useSWR, { useSWRConfig } from 'swr'
import { fetcher, updateData, uploadFile } from '../utils/fetch'
import { Cover } from '@prisma/client'
import produce from 'immer'

type PageResDataType = {
  data: {
    cover: Cover
  }
  status: 'success' | 'fail'
}

type UsePageSWRResult = {
  data: {
    cover: Cover['image'] | undefined
  }
  isLoading: boolean
  mutateFution: {
    uploadCoverImage: (id: string, src: string) => void
    uploadCoverImageFile: (id: string, file: File) => void
  }
}

type UsePageSWRType = (id: string) => UsePageSWRResult

export const usePageSWR: UsePageSWRType = (id) => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR<PageResDataType>(
    id ? `/api/page/${id}` : null,
    fetcher
  )

  const mutateFution: UsePageSWRResult['mutateFution'] = {
    uploadCoverImage: (id: string, src: string) => {
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
            return produce<PageResDataType>(page, (draft) => {
              draft.data.cover.image = uploadImage.data.image
            })
          },

          revalidate: false,
          optimisticData: uploadCover,
          rollbackOnError: true,
        }
      )
    },

    uploadCoverImageFile: (id, file) => {
      const path = URL.createObjectURL(file)
      const uploadCover = produce(data, (draft) => {
        if (draft) {
          draft.data.cover.image = path
        }
      })

      mutate(`/api/page/${id}`, uploadFile('uploadImage', { id, file }), {
        populateCache: (uploadImage, page) => {
          return produce<PageResDataType>(page, (draft) => {
            console.log(uploadImage)
            draft.data.cover.image = uploadImage.data.image
          })
        },

        revalidate: false,
        optimisticData: uploadCover,
        rollbackOnError: true,
      })
    },
  }

  return {
    data: {
      cover: data?.data?.cover.image || '',
    },
    isLoading: !error && !data,
    mutateFution,
  }
}
