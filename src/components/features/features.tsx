import React, { ReactElement } from 'react'
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  Center,
  Flex,
} from '@chakra-ui/react'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { FaFilePdf } from 'react-icons/fa'
import { IoLogoMarkdown } from 'react-icons/io'
import { SiAdobeillustrator, SiAdobephotoshop } from 'react-icons/si'
import { BsFillImageFill } from 'react-icons/bs'
import { IconType } from 'react-icons'

const featuresIcons: {
  [key: string]: IconType
} = {
  Excel: RiFileExcel2Fill,
  PDF: FaFilePdf,
  Markdown: IoLogoMarkdown,
  Illustrator: SiAdobeillustrator,
  Photoshop: SiAdobephotoshop,
  Image: BsFillImageFill,
}

const Features = () => {
  const fullIconsName = Object.keys(featuresIcons)

  return (
    <Box w="full" bg="brand.basic">
      <Container h="100%" maxW="container.xl">
        <Grid templateColumns={`repeat(${fullIconsName.length}, 1fr)`} gap={6}>
          {fullIconsName.map((name, index) => (
            <GridItem key={index} w="100%">
              <Center>
                <Flex gap="3" align="center" pt="10" pb="10" color="white">
                  {React.createElement(featuresIcons[name], {
                    style: { fontSize: '3rem' },
                  })}
                  <Text fontSize="lg">{name}</Text>
                </Flex>
              </Center>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Features
