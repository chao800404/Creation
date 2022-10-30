import { List } from '@prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { deleteData, fetcher } from '../utils/fetch'
import produce from 'immer'

type ListResDataType = {
  data: List[]
  status: 'success' | 'fail'
}

export const useDeleteList = () => {
  const { mutate } = useSWRConfig()
  const { data } = useSWR<ListResDataType>('/api/query/queryList', fetcher)

  return (id: string) => {
    const deleteList = produce(data, (draft) => {
      if (draft) {
        draft.data = draft.data.filter((item) => item.id !== id)
      }
    })

    mutate(`/api/query/queryList`, deleteData('deletePage', id), {
      populateCache: (deletePage, list: ListResDataType) => {
        return produce(list, (draft) => {
          draft.data = draft.data.filter((item) => item.id !== id)
        })
      },

      revalidate: false,
      optimisticData: deleteList,
      rollbackOnError: true,
    })
  }
}
