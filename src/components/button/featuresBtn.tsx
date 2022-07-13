import React from 'react'
import { Flex, Text, Button, Box } from '@chakra-ui/react'
import Base from '../base/base'
import { FeatureBtnProps } from '../../types/button'

const FeaturesBtn: React.FC<FeatureBtnProps> = ({
  icon,
  text,
  flex,
  display,
  justifyItems,
}) => {
  return (
    <Box flex={flex} display={display} justifyItems={justifyItems}>
      <Base text={text} icon={icon} />
    </Box>
  )
}

export default FeaturesBtn
