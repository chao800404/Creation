import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import React from 'react'
import { BoxProps, EditableProps } from '@chakra-ui/react'

interface EditType extends EditableProps {
  text: string
}

const Edit = (props: EditType) => {
  const { text, ...otherProps } = props

  return (
    <Editable
      {...props}
      defaultValue={text}
      w="full"
      {...otherProps}
      color={text ? 'brand.seconday-900' : 'brand.secondary-600'}
      fontWeight="bold"
    >
      <EditablePreview />
      <EditableInput
        border="none"
        outline="transparent"
        _focus={{
          outline: 'none',
          boxShadow: 'none',
        }}
        boxShadow="none"
      />
    </Editable>
  )
}

export default React.memo(Edit)
