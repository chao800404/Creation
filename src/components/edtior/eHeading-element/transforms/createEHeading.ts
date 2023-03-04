import { ElementOf, PlateEditor, TEditor, Value } from '@udecode/plate'
import { ELEMENT_EH1, ELEMENT_EH2, ELEMENT_EH3 } from '../../eHeading-element'

type EHeadingType = typeof ELEMENT_EH1 | typeof ELEMENT_EH2 | typeof ELEMENT_EH3

declare type CreateEHeading = <V extends Value>(
  edito: PlateEditor<V>,
  { levels }: { levels?: number }
) => ElementOf<TEditor<V>>

export const createEHeading: CreateEHeading = (editor, { levels }) => {
  let type: EHeadingType

  switch (levels) {
    case 1:
      type = ELEMENT_EH1
    case 2:
      type = ELEMENT_EH2
    case 3:
      type = ELEMENT_EH3
    default:
      type = ELEMENT_EH3
  }

  return editor.blockFactory({ type })
}
