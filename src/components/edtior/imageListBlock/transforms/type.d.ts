import { PlateEditor, Value, TElement } from '@udecode/plate'

type BaseImageOption<V extends Value> = {
  editor: PlateEditor<V>
  element: TElement
}
