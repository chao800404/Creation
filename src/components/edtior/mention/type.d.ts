import { PlateEditor, Value } from '@udecode/plate'

export type Item = Record<'image' | 'desc', string>

export type Command = (editor: PlateEditor<Value>) => void
