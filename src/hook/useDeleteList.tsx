import { List } from '@prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { deleteData, fetcher } from '../utils/fetch'

type ListResDataType = {
  data: List[]
  status: 'success' | 'fail'
}

export const useDeleteList = () => {
  const { mutate } = useSWRConfig()
  const { data } = useSWR<ListResDataType>('/api/query/queryList', fetcher)

  return (id: string) => {
    const cloneData = { ...data }

    if (cloneData && cloneData.data) {
      cloneData.data = cloneData.data.filter((data) => data.id !== id)
    }

    mutate(`/api/query/queryList`, deleteData('deletePage', id), {
      populateCache: (deletePage, list: ListResDataType) => {
        const cloneList = { ...list }
        cloneList.data = list.data.filter((item) => item.id !== id)
        return cloneList
      },

      revalidate: false,
      optimisticData: cloneData,
      rollbackOnError: true,
    })
  }
}
