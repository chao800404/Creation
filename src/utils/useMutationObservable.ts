import { useState, useEffect } from 'react'

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
}

export const useMutationObservable = (
  targetEl: HTMLElement | null | undefined,
  cb: () => void,
  options = DEFAULT_OPTIONS
) => {
  const [observer, setObserver] = useState<null | MutationObserver>(null)

  useEffect(() => {
    const obs = new MutationObserver(cb)
    setObserver(obs)
  }, [cb, options, setObserver])

  useEffect(() => {
    if (!observer && !targetEl) return
    const { config } = options
    observer?.observe(targetEl as Node, config)
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [observer, targetEl, options])
}
