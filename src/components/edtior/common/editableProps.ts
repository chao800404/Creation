import { ELEMENT_PARAGRAPH, TEditableProps } from '@udecode/plate'
import { MyValue } from '../plateTypes'

export const editableProps = ({
  onChange,
  readOnly,
}: {
  onChange: boolean
  readOnly: boolean
}): TEditableProps<MyValue> => ({
  spellCheck: false,
  autoFocus: true,
  readOnly,
  placeholder: onChange ? '' : `Type "/" for commands `,
})
