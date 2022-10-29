import React, { useEffect } from 'react'
import useStore from '../store/store'
import shallow from 'zustand/shallow'
import { updateData } from '../utils/fetch'
import { WorkspaceItem } from '../types/workspace'

const useEffectFetch = (
  start: boolean,
  setStart: (state: boolean) => void,
  path: string,
  id: WorkspaceItem['id'] | undefined,
  favorite: WorkspaceItem['favorite'] | undefined
) => {
  useEffect(() => {
    if (start) {
      const timeout = setTimeout(() => {
        const proFetch = async () => {
          await updateData(path, { id, favorite }, null)
          setStart(false)
        }
        proFetch()
      })
      return () => clearTimeout(timeout)
    }
  }, [start, setStart, path, id, favorite])
}

export default useEffectFetch
