import React, { useRef, useEffect, useState } from 'react'
import { Flex, Text, Box } from '@chakra-ui/react'
import { scrollBar } from '../../utils/style'

const SidebarContainer = ({ children }: { children: React.ReactNode }) => {
  const scrollElem = useRef<HTMLDivElement | null>(null)
  const [isCeiling, setIsCeiling] = useState(true)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    let ref: HTMLDivElement
    const updateScroll = () => {
      if (scrollElem && scrollElem.current) {
        const scrollValue = ref?.scrollTop
        setIsCeiling(scrollValue === 0)
      }
    }
    if (scrollElem && scrollElem.current) {
      ref = scrollElem.current
      ref.addEventListener('scroll', updateScroll, false)
    }

    return () => ref.removeEventListener('scroll', updateScroll, false)
  }, [isCeiling])

  return (
    <Box
      p="0 1rem"
      overflowY="scroll"
      ref={scrollElem}
      flex="1"
      mt="2"
      borderTop={`${!isCeiling && '1px'}`}
      borderColor="brand.secondary-600"
      bg={`${!isCeiling && 'brand.secondary-100'}`}
      pos="relative"
      onMouseEnter={() => setHover((hover) => !hover)}
      onMouseLeave={() => setHover((hover) => !hover)}
      zIndex="300"
      css={scrollBar(hover)}
    >
      <Flex direction="column" gap="2">
        {children}
      </Flex>
    </Box>
  )
}

export default SidebarContainer
