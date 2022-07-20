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
import ChangeCoverPopupGrid from '../layout/changeCoverPopupGrid'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'
import { scrollBar } from '../../utils/style'
import ChangeCoverUpload from '../layout/changeCoverUpload'
import { UploadCoverImageType } from '../../types/base'

const tabs = ['畫廊', '上傳', '連結']

interface ChangeCoverType extends BoxProps, UploadCoverImageType {}

const ChageCoverPopup = (props: ChangeCoverType) => {
  const coverImageMap = useStore((state) => state.coverImageMap, shallow)
  const setCoverImage = useStore((state) => state.setCoverImageSrc, shallow)

  const handleChangeCover: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = (e.target as HTMLElement).closest(
      '.cover_image'
    ) as HTMLElement
    if (target) {
      const src = target.dataset.src
      setCoverImage(src as string)
    }
  }

  return (
    <Box {...props} w="xs" h="md" boxShadow="md" borderRadius="10">
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Flex w="full" align="center" justify="space-between">
            <Flex>
              {tabs.map((tab, index) => (
                <Tab fontSize="inherit" key={index} data-set={`tab-${index}`}>
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
          <TabPanel onClick={handleChangeCover}>
            {coverImageMap &&
              Object.keys(coverImageMap).map((coverGroup, index) => (
                <ChangeCoverPopupGrid
                  key={index}
                  GroupName={coverGroup}
                  coverGroup={coverImageMap[coverGroup as string]}
                />
              ))}
          </TabPanel>
          <TabPanel h="full">
            <ChangeCoverUpload />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default ChageCoverPopup
