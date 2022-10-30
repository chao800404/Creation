import { List } from '@prisma/client'
import { useSWRConfig } from 'swr'
import { deleteData } from '../utils/fetch'

type ListResDataType = {
  data: List[]
  status: 'success' | 'fail'
}

export const useDeleteList = () => {
  const { mutate } = useSWRConfig()

  return (id: string) => {
    mutate(`/api/query/queryList`, deleteData('deletePage', id), {
      populateCache: (deletePage, list: ListResDataType) => {
        const cloneCache = { ...list }
        cloneCache.data = list.data.filter((item) => item.id !== id)
        return cloneCache
      },

      revalidate: false,
    })
  }
}
