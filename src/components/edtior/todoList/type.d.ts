import { Value } from '@udecode/plate-core'
import { TTodoListItemElement } from '@udecode/plate-list'
import { StyledElementProps } from '@udecode/plate-styled-components'
import { CSSProp } from 'styled-components'
import { StyledIcon } from '@styled-icons/styled-icon'

export interface TodoListElementStyleProps {
  checked?: boolean
  lineHeight: null | number
  align: string | null
  icon?: string
  indent?: number
}

export interface TodoListElementStyles {
  checkboxWrapper: CSSProp
  checkbox: CSSProp
  text: CSSProp
  rootChecked?: CSSProp
  lineHeight: null | number
}

export type TodoListElementProps<V extends Value> = StyledElementProps<
  V,
  TTodoListItemElement & TodoListElementStyleProps,
  TodoListElementStyles
>
