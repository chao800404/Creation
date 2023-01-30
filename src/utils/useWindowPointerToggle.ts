import { useState, useRef } from 'react'
import useOnClickOutside from './useOnClickOutside'

const useWindowPointerToggle = (
  handleClickOutSide?: (target?: Element) => void
) => {
  const [toggle, setToggle] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleToggleSet = (toggle: boolean) => setToggle(toggle)

  const handleOnPointerDown = (e: MouseEvent) => {
    const target = e.target as Element

    if (ref.current && !ref.current.contains(target)) {
      !!handleClickOutSide && handleClickOutSide(target)
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
