import useSWR, { useSWRConfig } from 'swr'
import shallow from 'zustand/shallow'
import { usePageStore } from '../store'
import { updateData } from '../utils/fetch'

export const useUploadLocalCoverImage = () => {
  const { mutate } = useSWRConfig()
  const { imageSet } = usePageStore(
    (state) => ({ imageSet: state.imageSet }),
    shallow
  )

  return (id: string, src: string) => {
    mutate(
      `/api/page/${id}`,
      updateData('updateImage', { id, key: 'cover', src }, null),
      {
        populateCache: (uploadImage, page) => {
          const cloneCache = { ...page }
          cloneCache.data.cover.image = uploadImage.data.image
          imageSet(uploadImage.data.image)
          return cloneCache
        },

        revalidate: false,
      }
    )
  }
}
