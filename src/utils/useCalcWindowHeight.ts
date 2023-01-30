import { useEffect, useState } from 'react'

type ResResult = 'TOP' | 'BOTTOM' | null
type UseCalcWindowHeight = <J>({
  elem,
  depend,
}: {
  elem: HTMLDivElement | null
  depend: J
}) => ResResult

const useCalcWindowHeight: UseCalcWindowHeight = ({ elem, depend }) => {
  const [result, setResult] = useState<boolean | null>(false)

  useEffect(() => {
    const rect = elem?.getBoundingClientRect()
    if (rect) {
      const { y } = rect
      setResult(y >= window.innerHeight / 2)
    } else {
      setResult(null)
    }
  }, [elem, depend])

  return result === null ? null : result ? 'TOP' : 'BOTTOM'
}

export default useCalcWindowHeight
