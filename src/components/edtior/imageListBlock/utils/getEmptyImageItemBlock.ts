import { ELEMENT_DESC } from './../../desc/descPlugin'
import { PlateEditor, Value } from '@udecode/plate-core'

import { ELEMENT_IMAGE_ITEM_BLOCK } from '../imageListBlockPlugin'
import { ELEMENT_EH3 } from '../../eHeading-element'
import { EElementOrText } from '@udecode/plate'

export const getEmptyImageItemBlock = <V extends Value>(
  editor: PlateEditor<V>
): EElementOrText<V> => {
  return {
    type: ELEMENT_IMAGE_ITEM_BLOCK,
    children: [
      editor.blockFactory({ type: ELEMENT_EH3 }),
      editor.blockFactory({ type: ELEMENT_DESC }),
    ],
  } as EElementOrText<V>
}
