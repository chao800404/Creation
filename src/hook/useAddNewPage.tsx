import useSWR, { useSWRConfig } from 'swr'
import { createData, fetcher } from '../utils/fetch'
import cuid from 'cuid'
import { List } from '@prisma/client'
import produce from 'immer'

type ListResDataType = {
  data: List[]
  status: 'success' | 'fail'
}

export const useAddNewPage = () => {
  const { mutate } = useSWRConfig()
  const { data } = useSWR<ListResDataType>('/api/query/queryList', fetcher)

  return () => {
    const newPage = {
      editable: true,
      favorite: false,
      id: cuid(),
      title: null,
    }

    const addList = produce(data, (draft) => {
      draft?.data.push(newPage as List)
    })

    mutate(`/api/query/queryList`, createData(`addNewPage`, newPage.id), {
      populateCache: (resPage, list: ListResDataType) => {
        return produce(list, (draft) => {
          draft?.data.push(resPage.data)
        })
      },
      revalidate: false,
      optimisticData: addList,
      rollbackOnError: true,
    })
  }
}
