import React from 'react'
import { Grid, GridItem, Text } from '@chakra-ui/react'
import Image from 'next/image'

function ChangeCoverPopupGrid({
  coverGroup,
  GroupName,
}: {
  coverGroup: string[]
  GroupName: string
}) {
  return (
    <>
      <Text color="brand.secondary-700" mt="2">
        {GroupName.toUpperCase().replaceAll('_', ' ')}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" columnGap={2}>
        {coverGroup &&
          coverGroup.map((path, index) => (
            <GridItem
              w="100%"
              h="3.5rem"
              pos="relative"
              key={index}
              borderRadius="3"
              overflow="hidden"
              mt="2"
              className="cover_image"
              data-src={path}
            >
              <Image
                alt={`${GroupName}-${index}`}
                src={path as string}
                layout="fill"
                objectFit="cover"
              />
            </GridItem>
          ))}
      </Grid>
    </>
  )
}

export default ChangeCoverPopupGrid
