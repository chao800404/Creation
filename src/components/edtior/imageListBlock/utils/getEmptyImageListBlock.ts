import { ELEMENT_IMAGE_LIST_BLOCK } from './../imageListBlockPlugin'
import { GetEmptyRowNodeOptions, TTableElement } from '@udecode/plate'
import { getPluginType, PlateEditor, Value } from '@udecode/plate-core'
import { getEmptyImageItemBlock } from './getEmptyImageItemBlock'

export interface GetEmptyImageListBlockOption {
  quant?: number
}

export const getEmptyImageListBlock = <V extends Value>(
  editor: PlateEditor<V>,
  { quant }: GetEmptyImageListBlockOption
): TTableElement => {
  const items = Array(quant)
    .fill(quant)
    .map(() => getEmptyImageItemBlock(editor))

  return {
    type: getPluginType(editor, ELEMENT_IMAGE_LIST_BLOCK),
    children: items,
  }
}
