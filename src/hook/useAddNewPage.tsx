import useSWR, { useSWRConfig } from 'swr'
import shallow from 'zustand/shallow'
import { usePageStore } from '../store'
import { createData } from '../utils/fetch'
import { v4 as uuidv4 } from 'uuid'
import { List } from '@prisma/client'

type ListResDataType = {
  data: List[]
  status: 'success' | 'fail'
}

export const useAddNewPage = () => {
  const { mutate } = useSWRConfig()

  return () => {
    const newPage = {
      editable: true,
      favorite: false,
      id: uuidv4(),
      title: null,
    }

    mutate(`/api/query/queryList`, createData('addNewPage', newPage.id), {
      populateCache: (resPage, list: ListResDataType) => {
        console.log(list, resPage)
        const cloneCache = { ...list }
        cloneCache.data.push(newPage as List)

        // cloneCache.data.cover.image = uploadImage.data.image
        // imageSet(uploadImage.data.image)
        // return cloneCache
      },

      revalidate: false,
    })
  }
}
