import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { motion } from 'framer-motion'
import IconContainer from '../iconContainer/iconContainer'

const InitialBtn = ({ icon, text }: { icon: IconType; text: string }) => {
  return (
    <Flex
      align="center"
      justify="center"
      p="2"
      border="2px solid"
      borderRadius="md"
      borderColor="#D9D9D9"
      boxShadow="sm"
      gap="2"
      w="12rem"
      bg="white"
      as={motion.button}
      initial={{ y: 0 }}
      whileTap={{ y: '1px' }}
    >
      <IconContainer type="base" size="1.5rem" icon={icon} />
      <Text fontSize=".9rem" fontWeight="bold">
        {text}
      </Text>
    </Flex>
  )
}

export default InitialBtn
