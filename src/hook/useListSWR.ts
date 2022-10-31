import { List } from '@prisma/client'
import useSWR from 'swr'
import { fetcher } from '../utils/fetch'

type UseFetch = () => {
  data: {
    data: List[]
    status: 'success' | 'fail'
  }
  isLoading: boolean
  isError: boolean
}

export const useListSWR: UseFetch = () => {
  const { data, error } = useSWR(`/api/query/queryList`, fetcher)

  console
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
