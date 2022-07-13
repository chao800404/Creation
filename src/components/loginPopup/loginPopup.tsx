/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, memo, useEffect } from 'react'
import {
  SlideFade,
  Box,
  Center,
  FormControl,
  Checkbox,
  Text,
  Link,
  Flex,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import useStore from '../../store/store'
import { CloseIcon } from '@chakra-ui/icons'
import BasicButton from '../button/button'
import Logo from '../logo/logo'
import Line from '../line/line'
import BasicInput from '../input/input'
import { HiOutlineMail } from 'react-icons/hi'
import { FaRegUser } from 'react-icons/fa'
import { UserSlice } from '../../types/user'
import shallow from 'zustand/shallow'

const LoginPopup = () => {
  const { openPopup, toggle } = useStore(
    (state) => ({ openPopup: state.openPopup, toggle: state.toggle }),
    shallow
  )

  const clearUser = useStore((state: UserSlice) => state.clearUser, shallow)
  const validity = useStore((state: UserSlice) => state.validity, shallow)
  const showError = useStore((state: UserSlice) => state.showError, shallow)
  const setShowError = useStore((state) => state.setShowError)
  const { username, email } = useStore((state) => state.user, shallow)

  const [checkedItems, setCheckedItems] = React.useState(true)
  const toast = useToast()

  const elemRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as Element).closest('#login-form-box')
    const formParent = elemRef.current
    if (target === formParent || e.button === 2 || e.button === 1) return
    toggle()
  }

  const handleGoogleSingIn = async () => {
    const res = await signIn('google')
    console.log(res)
  }

  const handleMailSignIn = async () => {
    if (!checkedItems) return
    if (!(validity.email && validity.name)) {
      return setShowError(!validity)
    }
    await signIn('email', {
      username,
      email,
    })
  }

  useEffect(() => {
    if (showError) {
      toast({
        title: '信箱或姓名格式錯誤',
        description: '請輸入正確信箱或姓名格式',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }, [showError, toast])

  useEffect(() => {
    clearUser()
  }, [])

  return (
    <Box
      w="full"
      h="full"
      pos="fixed"
      top="0"
      zIndex="30"
      backdropFilter="blur(.3rem) hue-rotate(90deg)"
      background="rgba(0,0,0,.7)"
      onMouseDown={handleMouseEnter}
    >
      <Center w="full" h="full" pos="absolute" top="0" zIndex="20">
        <SlideFade in={openPopup} offsetY="100px">
          <Box
            p="20px 3rem"
            w="30rem"
            h="40rem"
            mt="4"
            bg="gray.200"
            rounded="md"
            shadow="xl"
            zIndex="300"
            pos="relative"
            ref={elemRef}
            id="login-form-box"
          >
            <Box
              pos="absolute"
              top="1"
              right="1"
              pt="2"
              pr="3"
              pb="2"
              pl="3"
              borderTopRightRadius="md"
              onClick={toggle}
              cursor="pointer"
              _hover={{ bg: 'gray.500' }}
            >
              <CloseIcon color="gray.800" />
            </Box>
            <Center mt="5">
              <Logo type="secondType" />
            </Center>
            <Center mt="10">
              <BasicButton type="google" handleClick={handleGoogleSingIn} />
            </Center>
            <Center mt="5">
              <Line mr="1rem" />
              <Box as="span">或</Box>
              <Line ml="1rem" />
            </Center>
            <FormControl mt="3">
              <Box pos="relative">
                <BasicInput
                  type="email"
                  placeholder="輸入電子郵件"
                  validity={validity.email}
                >
                  <HiOutlineMail size="1.5rem" />
                </BasicInput>
              </Box>
              <Box pos="relative" mt="3">
                <BasicInput
                  type="username"
                  placeholder="輸入您的姓名"
                  validity={validity.name}
                >
                  <FaRegUser size="1.5rem" />
                </BasicInput>
              </Box>

              <Flex align="center" mt="5">
                <Tooltip
                  hasArrow
                  label="如果你想要繼續，請勾選此方塊"
                  bg="red.600"
                  p="2"
                  placement="bottom"
                  ml="5"
                  mt="2"
                  isOpen={!checkedItems}
                >
                  <Checkbox
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCheckedItems(e.target.checked)
                    }
                    size="lg"
                    colorScheme="gray"
                    defaultChecked
                    bg="gray.400"
                  />
                </Tooltip>

                <Text fontSize="sm" ml="2">
                  註冊帳號即表示您同意我們的
                  <Link color="blue.700" href="#">
                    服務條款
                  </Link>
                  以及
                  <Link color="blue.700" href="#">
                    隱私政策
                  </Link>
                </Text>
              </Flex>

              <Box mt="5">
                <BasicButton
                  type="email"
                  text="註冊"
                  handleClick={handleMailSignIn}
                />
              </Box>
              <Center mt="5">
                <Text>已經註冊過了？ </Text>
                <Link color="blue.700" href="#">
                  登入
                </Link>
              </Center>
              <Box h="1rem" borderBottom="1px" borderColor="gray.300" />
              <Center mt="2">
                <Text fontSize="xs" w="80%" color="gray.500" align="center">
                  This site is protected by reCAPTCHA and the Google Privacy
                  Policy and Terms of Service apply.
                </Text>
              </Center>
            </FormControl>
          </Box>
        </SlideFade>
      </Center>
    </Box>
  )
}

export default memo(LoginPopup)
