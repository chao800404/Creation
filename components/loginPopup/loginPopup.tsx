import React, { useRef, useCallback, memo } from 'react'
import {
  SlideFade,
  Box,
  Center,
  FormControl,
  Checkbox,
  Text,
  Link,
  FormHelperText,
} from '@chakra-ui/react'
import useStore from '../../store/store'
import { CloseIcon } from '@chakra-ui/icons'
import BasicButton from '../button/button'
import Logo from '../logo/logo'
import Line from '../line/line'
import BasicInput from '../input/input'
import { HiOutlineMail } from 'react-icons/Hi'
import { FaRegUser } from 'react-icons/Fa'
import { UserSlice } from '../../types/user'
import shallow from 'zustand/shallow'

const LoginPopup = () => {
  const { openPopup, toggle } = useStore(
    (state) => ({ openPopup: state.openPopup, toggle: state.toggle }),
    shallow
  )
  const validity = useStore((state: UserSlice) => state.validity, shallow)
  const showError = useStore((state: UserSlice) => state.showError, shallow)

  const elemRef = useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    const target = (e.target as Element).closest('#login-form-box')
    const formParent = elemRef.current
    if (target === formParent) return
    return toggle()
  }

  return (
    <>
      {openPopup && (
        <Box
          w="full"
          h="full"
          pos="absolute"
          top="0"
          backdropFilter="blur(.3rem) hue-rotate(90deg)"
          zIndex="9999"
          _before={{
            content: `""`,
            position: 'absolute',
            width: 'full',
            height: 'full',
            bg: 'gray.800',
            top: `0`,
            opacity: `.7`,
            zIndex: 2,
          }}
          onClick={handleClick}
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
                  <BasicButton validity type="google" />
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
                  <FormHelperText color="red.800" h="1rem" fontSize=".5rem">
                    {showError && '帳號或密碼錯誤'}
                  </FormHelperText>
                  <Checkbox mt="2" size="lg" colorScheme="gray" defaultChecked>
                    <Text fontSize="sm">
                      註冊帳號即表示您同意我們的
                      <Link color="blue.700" href="#">
                        服務條款
                      </Link>
                      以及
                      <Link color="blue.700" href="#">
                        隱私政策
                      </Link>
                    </Text>
                  </Checkbox>
                  <Box mt="5">
                    <BasicButton
                      type="email"
                      text="註冊"
                      validity={validity.email && validity.name}
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
      )}
    </>
  )
}

export default memo(LoginPopup)
