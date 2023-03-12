import React from 'react'
import { Value } from '@udecode/plate-core'
import {
  getRootProps,
  StyledElementProps,
} from '@udecode/plate-styled-components'
import { getCodeLineElementStyles } from '@udecode/plate'

export const CodeLineElement = <V extends Value>(
  props: StyledElementProps<V>
) => {
  const { attributes, children, nodeProps } = props
  const [onLoad, setOnLoad] = React.useState(false)

  const rootProps = getRootProps(props)
  const { root } = getCodeLineElementStyles(props)

  React.useEffect(() => {
    const timeout = setTimeout(() => setOnLoad(true))
    return () => clearTimeout(timeout)
  }, [])

  return onLoad ? (
    <div
      id={'code_line'}
      {...attributes}
      className={root.className}
      {...rootProps}
      {...nodeProps}
    >
      {children}
    </div>
  ) : (
    <></>
  )
}
