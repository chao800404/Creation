import React from 'react'
import { Value } from '@udecode/plate-core'
import {
  getRootProps,
  StyledElementProps,
} from '@udecode/plate-styled-components'
import { getCodeLineElementStyles } from '@udecode/plate'
import { CodeLine } from './codeBlock.styles'

export const CodeLineElement = <V extends Value>(
  props: StyledElementProps<V>
) => {
  const { attributes, children, nodeProps } = props

  const rootProps = getRootProps(props)
  const { root } = getCodeLineElementStyles(props)

  return (
    <div
      id={'code_line'}
      {...attributes}
      className={root.className}
      {...rootProps}
      {...nodeProps}
    >
      {children}
    </div>
  )
}
