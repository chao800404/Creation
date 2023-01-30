import { ELEMENT_PARAGRAPH, TEditableProps } from '@udecode/plate'
import { MyValue } from '../plateTypes'

export const editableProps = ({
  onChange,
}: {
  onChange: boolean
}): TEditableProps<MyValue> => ({
  spellCheck: false,
  autoFocus: true,
  readOnly: false,
  placeholder: onChange ? '' : `Type "/" for commands `,
})
