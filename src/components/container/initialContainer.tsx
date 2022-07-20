import React from 'react'
import { Box, Flex, Center, Text, Heading } from '@chakra-ui/react'
import InitialBtn from '../button/initialBtn'
import { IoDocumentText, IoDocument } from 'react-icons/io5'
import { BsTable, BsListStars, BsCalendar2Date } from 'react-icons/bs'
import { CgTemplate } from 'react-icons/cg'
import { TiClipboard } from 'react-icons/ti'

const InitialContainer = () => {
  return (
    <Flex h="full" w="full">
      <Flex direction="column" gap="5">
        <Heading color="brand.secondary-700" mt="5">
          一般類型
        </Heading>
        <Flex
          w="50rem"
          color="brand.secondary-700"
          gap="2"
          align="center"
          justify="start"
          wrap="wrap"
        >
          <InitialBtn text="基本空白頁" icon={IoDocument} />
          <InitialBtn text="含圖示空白頁" icon={IoDocumentText} />
          <InitialBtn text="模板空白頁" icon={CgTemplate} />
        </Flex>
        <Heading color="brand.secondary-700">資料庫</Heading>
        <Flex
          w="50rem"
          color="brand.secondary-700"
          gap="2"
          align="center"
          justify="start"
          wrap="wrap"
        >
          <InitialBtn text="空白列表" icon={BsListStars} />
          <InitialBtn text="空白清單列表" icon={TiClipboard} />
          <InitialBtn text="表單空白頁" icon={BsTable} />
          <InitialBtn text="空白行事曆" icon={BsCalendar2Date} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default InitialContainer
