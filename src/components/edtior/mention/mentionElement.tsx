import React from 'react'
import { getHandler, Value } from '@udecode/plate-core'
import { useFocused, useSelected } from 'slate-react'
import { comboboxSelectors, MentionElementProps } from '@udecode/plate'
import { MentionElementWrapper } from './mention.style'

export const MentionElement = <V extends Value>(
  props: MentionElementProps<V>
) => {
  const { attributes, children, element } = props

  const selected = useSelected()
  const focused = useFocused()

  return (
    <MentionElementWrapper
      backgroundColor={element.color as string}
      {...attributes}
      data-slate-value={element.value}
      contentEditable={false}
      isFocus={selected && focused}
    >
      {`${element.type} ${element.value}`}
      {children}
    </MentionElementWrapper>
  )
}
