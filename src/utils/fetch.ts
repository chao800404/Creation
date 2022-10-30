import { URL } from './config'

export const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json())
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
  const res = await fetch(`/api/mutation/${path}/${id}`, {
    method: 'POST',
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

export const deleteData = async (path: string, id: string) => {
  const res = await fetch(`/api/mutation/${path}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      'Content-type': 'application/json;',
    },
  })
  return res
}