import { AutoformatPlugin } from '@udecode/plate'
import { MyEditor, MyPlatePlugin, MyValue } from '../plateTypes'
import { autoformatRules } from './autoformatRules'

export const autoformatPlugin: Partial<
  MyPlatePlugin<AutoformatPlugin<MyValue, MyEditor>>
> = {
  options: {
    rules: autoformatRules,
    enableUndoOnDelete: true,
  },
}
