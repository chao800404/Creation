import { focusEditor, PlateEditor, Value } from '@udecode/plate'
import { Location } from 'slate'

export type focusEditorOption<V extends Value> = {
  editor: PlateEditor<V>
  path: Location
}

export const focusEditorElem = <V extends Value>({
  editor,
  path,
}: focusEditorOption<V>) => {
  const timeout = setTimeout(() => {
    focusEditor(editor, path)
  }, 50)

  return () => clearTimeout(timeout)
}
