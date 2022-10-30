import useSWR from 'swr'
import { fetcher } from '../utils/fetch'
import { URL } from '../utils/config'

type UseFetch = <T>() => {
  data: {
    data: T
    status: 'success' | 'fail'
  }
  isLoading: boolean
  isError: boolean
}

export const useFetch: UseFetch = () => {
  const { data, error } = useSWR(`/api/query/queryList`, fetcher)

  console
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
