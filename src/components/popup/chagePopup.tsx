import React from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  BoxProps,
} from '@chakra-ui/react'

import useStore from '../../store/store'
import shallow from 'zustand/shallow'
import { ImageType, ChangePopupType } from '../../types/base'
import { scrollBar } from '../../utils/style'
import UploadLayout from '../layout/uploadLayout'

const tabs = ['上傳', '連結']

const ChangePopup = (props: ChangePopupType) => {
  const { imageTab, children, onClick, uploadImage, ...otherProps } = props
  const [file, setFile] = React.useState<ImageType>({
    imageFilePath: null,
    imageName: '',
  })

  const setHovered = useStore((state) => state.setToggleHoverdCover, shallow)

  const togglePopup = useStore(
    (state) => state.setToggleChangeCoverPopup,
    shallow
  )

  const handleUpload = () => {
    if (file.imageFilePath) {
      uploadImage(file.imageFilePath)
      setHovered && setHovered(false)
      togglePopup(false)
    }
  }

  return (
    <Box {...otherProps} w="xs" h="md" boxShadow="md" borderRadius="10">
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Flex
            w="full"
            align="center"
            justify="space-between"
            fontSize=".8rem"
          >
            <Flex>
              <Tab fontSize="inherit">{imageTab}</Tab>
              {tabs.map((tab, index) => (
                <Tab fontSize="inherit" key={index}>
                  {tab}
                </Tab>
              ))}
            </Flex>
            <Box
              _hover={{ bg: 'brand.secondary-400' }}
              mr="2"
              color="gray.600"
              fontSize="inherit"
              p=".2rem .5rem"
            >
              刪除封面
            </Box>
          </Flex>
        </TabList>
        <TabPanels
          w="full"
          h="sm"
          overflowY="scroll"
          css={scrollBar(true)}
          overflowX="hidden"
        >
          <TabPanel onClick={onClick}>{children}</TabPanel>
          <TabPanel h="full">
            <UploadLayout
              onClick={handleUpload}
              file={file}
              setFile={setFile}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default ChangePopup
