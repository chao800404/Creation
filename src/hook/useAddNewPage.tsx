import useSWR, { useSWRConfig } from 'swr'
import shallow from 'zustand/shallow'
import { usePageStore } from '../store'
import { createData } from '../utils/fetch'
import { v4 as uuidv4 } from 'uuid'

export const useUploadLocalCoverImage = () => {
  const { mutate } = useSWRConfig()
  const { imageSet } = usePageStore(
    (state) => ({ imageSet: state.imageSet }),
    shallow
  )

  return (id: string, src: string) => {
    const newPage = {
      editable: true,
      favorite: false,
      id: uuidv4(),
      title: null,
    }

    mutate(`/api/query/queryList`, createData('addNewPage', newPage.id), {
      populateCache: (newPage, list) => {
        const cloneCache = { ...list }
        console.log(cloneCache, newPage)

        // cloneCache.data.cover.image = uploadImage.data.image
        // imageSet(uploadImage.data.image)
        // return cloneCache
      },

      revalidate: false,
    })
  }
}
