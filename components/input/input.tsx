import React, { useEffect, useState } from 'react'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { BsCheckLg, BsXLg } from 'react-icons/Bs'
import { UserSlice } from '../../types/user'

const BasicInput = ({
  children,
  placeholder,
  type,
  validity,
}: {
  children: React.ReactElement
  placeholder: string
  type: string
  validity: boolean
}) => {
  const addUser = useStore((state) => state.addUser, shallow)
  const updateValidity = useStore((state) => state.updateValidity)
  const [hiddenCheckIcon, setHiddenCheckIcon] = useState(true)
  const setShowError = useStore((state) => state.setShowError)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name || ''
    const value = e.target.value || ''
    setHiddenCheckIcon((prev) => (prev = false))
    addUser(name, value)
    updateValidity()
    return setShowError(false)
  }

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
