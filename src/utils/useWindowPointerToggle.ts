import { useState, useRef } from 'react'
import useOnClickOutside from './useOnClickOutside'

const useWindowPointerToggle = <T extends Node>(
  handleClickOutSide?: (target?: T) => void
) => {
  const [toggle, setToggle] = useState(false)
  const ref = useRef<T>(null)

  const handleToggleSet = (toggle: boolean) => setToggle(toggle)

  const handleOnPointerDown = (e: MouseEvent) => {
    const target = e.target

    if (
      target &&
      ref.current &&
      !(ref.current as unknown as HTMLElement).contains(target as Node)
    ) {
      !!handleClickOutSide && handleClickOutSide(target as T)
      setToggle(false)
    }
  }

  useOnClickOutside((e) => handleOnPointerDown(e))

  return {
    handleToggleSet,
    toggle,
    ref,
  }
}

export default useWindowPointerToggle
