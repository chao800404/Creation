import useSWR from 'swr'
import { fetcher } from '../utils/fetch'

export const useFetch = () => {
  const { data, error } = useSWR(`/api/query/queryList`, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
