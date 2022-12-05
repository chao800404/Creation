import { Emoji, Page } from '@prisma/client'
import { URL } from './config'
import { useStatusStore } from '../../src/store/useStatusStore'

const setStatus = useStatusStore.getState().statusSet

export const fetcher = async (url: string) => {
  setStatus('pending', '')
  const res = await fetch(url)
  const data = await res.json()
  if (res.ok) setStatus('success', '')
  if (data.status === 'fail') setStatus('error', data.message)
  return data
}

export const multiFetcher = ({
  url,
  page,
}: {
  url: string
  page: (Page & { emoji: Emoji })[]
}) => {
  return Promise.all(page?.map((item) => fetcher(`${url}/${item.id}`)))
}

export const uploadFile = async (
  path: string,
  data: { id: string; file: File | FileList }
) => {
  setStatus('pending', '')
  const formData = new FormData()
  formData.append('id', data.id)
  formData.append('image', data.file as Blob)

  const res = await fetch(`/api/mutation/${path}`, {
    method: 'POST',
    body: formData,
  })
  const resData = await res.json()
  if (res.ok) setStatus('success', '')
  if (resData.status === 'fail') setStatus('error', resData.message)
  return resData
}

export const createData = async <T>(path: string, id: string): Promise<T> => {
  setStatus('pending', '')
  const res = await fetch(`/api/mutation/${path}?id=${id}`, {
    method: 'POST',
  })
  if (res.ok) setStatus('success', '')
  const data = await res.json()
  if (data.status === 'fail') setStatus('error', data.message)
  return data
}

export const createBlock = async <T>(
  path: string,
  data: T,
  signal?: AbortSignal | null | undefined
): Promise<T> => {
  setStatus('pending', '')
  const res = await fetch(`/api/mutation/${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  })
  const resData = await res.json()
  if (res.ok) setStatus('success', '')
  if (resData.status === 'fail') setStatus('error', resData.message)
  return resData
}

export const proFetch = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${URL}/api/query/${path}`)
  const resData = await res.json()
  return resData
}

export const updateData = async <T>(
  path: string,
  data: T | string,
  signal: AbortSignal | null | undefined
) => {
  setStatus('pending', '')
  const res = await fetch(`/api/mutation/${path}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json;',
    },
    signal,
  })
  const resData = await res.json()
  if (res.ok) setStatus('success', '')
  if (resData.status === 'fail') setStatus('error', resData.message)
  return resData
}

export const deleteData = async <T>(path: string, body: T) => {
  setStatus('pending', '')
  const res = await fetch(`/api/mutation/${path}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json;',
    },
  })
  const resData = await res.json()
  if (res.ok) setStatus('success', '')
  if (resData.status === 'fail') setStatus('error', resData.message)
  return resData
}
