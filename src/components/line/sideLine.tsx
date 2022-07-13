import { Box } from '@chakra-ui/react'
import React, { useRef, useEffect } from 'react'

const SideLine = ({
  onPointerDown,
  setSideLineElem,
}: {
  onPointerDown: React.PointerEventHandler<HTMLDivElement>
  setSideLineElem: React.Dispatch<React.SetStateAction<null>>
}) => {
  const sideLineElem = useRef(null)

  useEffect(() => {
    setSideLineElem(sideLineElem.current)
  }, [setSideLineElem])

  return (
    <Box
      pos="absolute"
      right={0}
      w="3px"
      top={0}
      transform="translateX(50%)"
      h="full"
      cursor="col-resize"
      zIndex="100"
      ref={sideLineElem}
      onPointerDown={onPointerDown}
      _hover={{
        bg: 'brand.secondary-600',
      }}
    />
  )
}

export default SideLine
