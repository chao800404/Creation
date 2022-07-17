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

const tabs = ['畫廊', '上傳', '連結']

const ChageCoverPopup = (props: BoxProps) => {
  const coverImageMap = useStore((state) => state.coverImageMap, shallow)
  const setCoverImage = useStore((state) => state.setCoverImageSrc, shallow)

  const handleChangeCover: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = (e.target as HTMLElement).closest(
      '.cover_image'
    ) as HTMLElement
    const src = target.dataset.src
    console.log(src)
    setCoverImage(src as string)
  }

  return (
    <Box
      pos={props.pos}
      left={props.left}
      w="xs"
      h="md"
      bg={props.bg}
      zIndex={props.zIndex}
      top={props.top}
      boxShadow="md"
      borderRadius="10"
    >
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
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default ChageCoverPopup
