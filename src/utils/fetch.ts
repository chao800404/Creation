import { Emoji, Page } from '@prisma/client'
import { URL } from './config'

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

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
  const formData = new FormData()
  formData.append('id', data.id)
  formData.append('image', data.file as Blob)

  const res = await fetch(`/api/mutation/${path}`, {
    method: 'POST',
    body: formData,
  })
  return await res.json()
}

export const createData = async <T>(path: string, id: string): Promise<T> => {
  const res = await fetch(`/api/mutation/${path}?id=${id}`, {
    method: 'POST',
  })
  return await res.json()
}

export const createBlock = async <T>(
  path: string,
  data: T,
  signal?: AbortSignal | null | undefined
): Promise<T> => {
  const res = await fetch(`/api/mutation/${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  })
  return await res.json()
}

export const proFetch = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${URL}/api/query/${path}`)
  const resData = (await res.json()) as T
  return resData
}

export const updateData = async <T>(
  path: string,
  data: T | string,
  signal: AbortSignal | null | undefined
) => {
  const res = await fetch(`/api/mutation/${path}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json;',
    },
    signal,
  })
  return res.json()
}

export const deleteData = async <T>(path: string, body: T) => {
  const res = await fetch(`/api/mutation/${path}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json;',
    },
  })
  return res
}
