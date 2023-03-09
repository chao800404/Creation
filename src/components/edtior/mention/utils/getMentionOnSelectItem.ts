import {
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
  MentionPlugin,
  PlateEditor,
  TMentionElement,
  Value,
} from '@udecode/plate'
import {
  comboboxActions,
  ComboboxOnSelectItem,
  comboboxSelectors,
  Data,
  NoData,
} from '@udecode/plate-combobox'
import {
  getBlockAbove,
  getPlugin,
  insertText,
  isEndPoint,
  PlatePluginKey,
  removeNodes,
  select,
  TNodeProps,
  withoutNormalizing,
} from '@udecode/plate-core'
import { SuggestionItem } from '../items'

export const getMentionOnSelectItem =
  <TData extends Data = NoData>({
    key = ELEMENT_MENTION,
  }: PlatePluginKey = {}): ComboboxOnSelectItem<TData> =>
  (editor, item) => {
    const targetRange = comboboxSelectors.targetRange()

    if (!targetRange) return

    const {
      options: { insertSpaceAfterMention },
    } = getPlugin<MentionPlugin>(editor as PlateEditor<Value>, key)

    const pathAbove = getBlockAbove(editor)?.[1]
    const isBlockEnd = () =>
      editor.selection &&
      pathAbove &&
      isEndPoint(editor, editor.selection.anchor, pathAbove)

    withoutNormalizing(editor, () => {
      select(editor, targetRange)
      if (item) {
        const { command } = item as unknown as SuggestionItem
        removeNodes(editor, {
          match: (node) => node.type === ELEMENT_MENTION_INPUT,
        })
        command(editor)
      }
      if (isBlockEnd() && insertSpaceAfterMention) {
        insertText(editor, ' ')
      }
    })

    return comboboxActions.reset()
  }
