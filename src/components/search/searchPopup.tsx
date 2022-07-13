import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react'

import { BiSearch } from 'react-icons/bi'

const SearchPopup = ({
  onClose,
  isOpen,
}: {
  onClose: () => void
  isOpen: boolean
}) => {
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader p="0" fontSize="lg" fontWeight="bold">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <BiSearch color="gray.300" />
                </InputLeftElement>
                <Input type="tel" placeholder="Phone number" border="none" />
              </InputGroup>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default SearchPopup
