import React, { ReactElement } from 'react'
// import {
//   Box,
//   Container,
//   Grid,
//   GridItem,
//   Text,
//   Center,
//   Flex,
// } from '@chakra-ui/react'
// import { RiFileExcel2Fill } from 'react-icons/Ri'
// import { FaFilePdf } from 'react-icons/Fa'
// import { IoLogoMarkdown } from 'react-icons/Io'
// import { SiAdobeillustrator, SiAdobephotoshop } from 'react-icons/Si'
// import { IconType } from 'react-icons'

// const featuresIcons: {
//   [key: string]: IconType
// } = {
//   excel: RiFileExcel2Fill,
//   Pdf: FaFilePdf,
//   MD: IoLogoMarkdown,
//   Ai: SiAdobeillustrator,
//   Ps: SiAdobephotoshop,
// }

const Features = () => {
  // const fullIconsName = Object.keys(featuresIcons)

  return (
    <h1>Feature</h1>
    // <Box w="full" bg="brand.basic">
    //   <Container h="100%" maxW="container.xl">
    //     <Grid templateColumns={`repeat(${fullIconsName.length}, 1fr)`} gap={6}>
    //       {fullIconsName.map((name, index) => (
    //         <GridItem key={index} w="100%" bg="blue.500">
    //           <Center>
    //             <Flex direction="column">
    //               {React.createElement(featuresIcons[name])}
    //               <Text>{name}</Text>
    //             </Flex>
    //           </Center>
    //         </GridItem>
    //       ))}
    //     </Grid>
    //   </Container>
    // </Box>
  )
}

export default Features
