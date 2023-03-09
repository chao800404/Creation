import { findNodePath, TElement, Value } from '@udecode/plate'
import { setNodes, withoutNormalizing } from '@udecode/plate-core'
import { GetEmptyImageListBlockOption } from '../utils/getEmptyImageListBlock'
import { BaseImageOption } from './type'

type TImageBlcokElement = TElement & GetEmptyImageListBlockOption

export const resetImageUrl = <V extends Value>({
  editor,
  element,
}: BaseImageOption<V>) => {
  withoutNormalizing(editor, () => {
    const currentImageItemBlockPath = findNodePath(editor, element)
    setNodes<TImageBlcokElement>(
      editor,
      { url: '' },
      {
        at: currentImageItemBlockPath,
      }
    )
  })
}
