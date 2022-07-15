import React from 'react'
import { IoLogOutOutline } from 'react-icons/io5'
import { AiFillSetting } from 'react-icons/ai'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import { truncatedText } from '../../utils/truncatedText'
import { UserSlice } from '../../types/user'
import { signOut } from 'next-auth/react'
import useStore from '../../store/store'
import UserPopupItem from '../list-item/UserPopupItem'

const UserPopup: React.FC<UserSlice['user']> = ({ image, name, email }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Flex cursor="pointer" align="center" gap="3">
          <Box w="1.5rem" h="1.5rem" borderRadius="5px" overflow="hidden">
            <Image src={image} width="40" height="40" alt={email} />
          </Box>
          <Text fontSize="sm">{name ? name : truncatedText(email, 10)}</Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent fontSize=".5rem" mr="1rem" width="15rem">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Flex align="center" gap="3">
            {image && <Image src={image} width="30" height="30" alt={email} />}
            <Text>{email}</Text>
          </Flex>
        </PopoverHeader>
        <PopoverBody>
          <UserPopupItem text="用戶設定" icon={AiFillSetting} />
        </PopoverBody>
        <PopoverFooter cursor="pointer" onClick={() => signOut()}>
          <UserPopupItem text="登出" icon={IoLogOutOutline} />
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default UserPopup
