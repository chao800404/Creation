import React, { useEffect, useState } from 'react'
import useStore from '../../store/store'

import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { BsCheckLg, BsXLg } from 'react-icons/Bs'
import { UserSlice } from '../../types/user'
import shallow from 'zustand/shallow'
import { validateEamil, validateUserName } from '../../lib/validator'

const BasicInput = ({
  children,
  placeholder,
  type,
}: {
  children: React.ReactElement
  placeholder: string
  type: string
}) => {
  const user = useStore((state: UserSlice) => state.user, shallow)
  const addUser = useStore((state) => state.addUser)
  const [validity, setValidity] = useState(false)
  const [hiddenCheckIcon, setHiddenCheckIcon] = useState(true)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setHiddenCheckIcon((prev) => (prev = false))
    addUser({ [name]: value })
  }

  useEffect(() => {
    if (type === 'email') {
      const { validaty } = validateEamil(user.email)
      setValidity(validaty)
    } else if (type === 'username') {
      const { validaty } = validateUserName(user.username)
      setValidity(validaty)
    }
  }, [user, type])

  return (
    <>
      <InputGroup>
        <InputLeftElement color="gray.300" pointerEvents="none">
          {children}
        </InputLeftElement>
        <Input
          border="1px"
          borderColor="gray.400"
          type={type === 'username' ? 'text' : type}
          placeholder={placeholder}
          name={type}
          id={type}
          onChange={handleOnChange}
        />
        {!hiddenCheckIcon && (
          <InputRightElement>
            {validity ? <BsCheckLg color="green" /> : <BsXLg color="red" />}
          </InputRightElement>
        )}
      </InputGroup>
    </>
  )
}

export default BasicInput
