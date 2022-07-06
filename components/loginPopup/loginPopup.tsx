import React from 'react'
import {
  SlideFade,
  Box,
  Center,
  FormControl,
  Checkbox,
  Text,
  Link,
} from '@chakra-ui/react'
import useStore from '../../store/store'
import { CloseIcon } from '@chakra-ui/icons'
import BasicButton from '../button/button'
import Logo from '../logo/logo'
import Line from '../line/line'
import BasicInput from '../input/input'
import { HiOutlineMail } from 'react-icons/Hi'
import { FaRegUser } from 'react-icons/Fa'

const LoginPopup = () => {
  const togglePopup = useStore((state) => state.togglePopup)
  const toggle = useStore((state) => state.toggle)

  // const [user, setUser] = useState({
  //   username: '',
  //   email: '',
  // })

  return (
    <>
      {togglePopup && (
        <Box
          w="full"
          h="full"
          pos="absolute"
          top="0"
          backdropFilter="blur(.3rem) hue-rotate(90deg)"
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
        >
          <Center w="full" h="full" pos="absolute" top="0" zIndex="20">
            <SlideFade in={togglePopup} offsetY="100px">
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
                  <BasicButton type="google" />
                </Center>
                <Center mt="5">
                  <Line mr="1rem" />
                  <Box as="span">或</Box>
                  <Line ml="1rem" />
                </Center>
                <FormControl mt="3">
                  <Box pos="relative">
                    <BasicInput type="email" placeholder="輸入電子郵件">
                      <HiOutlineMail size="1.5rem" />
                    </BasicInput>
                  </Box>
                  <Box pos="relative" mt="3">
                    <BasicInput type="username" placeholder="輸入您的姓名">
                      <FaRegUser size="1.5rem" />
                    </BasicInput>
                  </Box>
                  <Checkbox mt="5" size="lg" colorScheme="gray" defaultChecked>
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
                    <BasicButton type="email" text="登入" />
                  </Box>
                  <Center mt="5">
                    <Text>已經註冊過了？ </Text>
                    <Link color="blue.700" href="#">
                      登入
                    </Link>
                  </Center>
                  <Box h="1rem" borderBottom="1px" borderColor="gray.300" />
                  <Center mt="5">
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

export default LoginPopup
