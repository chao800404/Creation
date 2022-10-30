import useSWR, { useSWRConfig } from 'swr'
import shallow from 'zustand/shallow'
import { usePageStore } from '../store'
import { createData, fetcher } from '../utils/fetch'
import { v4 as uuidv4 } from 'uuid'
import { List } from '@prisma/client'

type ListResDataType = {
  data: List[]
  status: 'success' | 'fail'
}

export const useAddNewPage = () => {
  const { mutate } = useSWRConfig()
  const { data } = useSWR('/api/query/queryList', fetcher)

  return () => {
    const newPage = {
      editable: true,
      favorite: false,
      id: uuidv4(),
      title: null,
    }

    const newList = [...data.data, newPage]
    const combineData = { ...data, data: newList }

    mutate(`/api/query/queryList`, createData(`addNewPage`, newPage.id), {
      populateCache: (resPage, list: ListResDataType) => {
        const cloneList = { ...list }
        cloneList.data.push(resPage.data)

        return cloneList
      },
      revalidate: false,
      optimisticData: combineData,
      rollbackOnError: true,
    })
  }
}
