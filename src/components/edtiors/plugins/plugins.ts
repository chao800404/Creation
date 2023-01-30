import {
  createPlugins,
  createMentionPlugin,
  createComboboxPlugin,
  createExitBreakPlugin,
  createSoftBreakPlugin,
  createNodeIdPlugin,
  createResetNodePlugin,
  createIndentPlugin,
  createIndentListPlugin,
  createSelectOnBackspacePlugin,
  createLineHeightPlugin,
  ELEMENT_HR,
  createAutoformatPlugin,
  AutoformatPlugin,
  createReactPlugin,
  createNormalizeTypesPlugin,
  ELEMENT_H1,
  ELEMENT_PARAGRAPH,
  createFontFamilyPlugin,
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createEmojiPlugin,
  EmojiCombobox,
  RenderAfterEditable,
  createLinkPlugin,
  PlateFloatingLink,
  createAlignPlugin,
} from '@udecode/plate'

import { HexColorPicker } from 'react-colorful'
import { basicNodesPlugins } from '../basic-nodes/basicNodesPlugins'
import { plateUI } from '../common/plateUI'
import { MyEditor, MyValue } from '../plateTypes'
import { exitBreakPlugin } from './exitBreakPlugin'
import { withStyledPlaceHolders } from '../withWrapper/withPlaceholder'
import { softBreakPlugin } from './softBreakPlugin'
import { mentionPlugin } from './mentionPlugin'
import { resetBlockTypePlugin } from './resetBlockTypePlugin'
import { createDndPlugin } from '@udecode/plate-ui-dnd'
import { withStyledDraggables } from '../withWrapper/withStyledDraggables'
import { indentListPlugin } from './indentListPlugin'
import { indentPlugin } from './indentPlugin'
import { lineHeightPlugin } from './lineHeightPlugin'
import { autoformatPlugin } from '../autoformatBlock/autoformatPlugin'
import { alignPlugin } from './alignPlugin'
import cuid from 'cuid'
// import { normalizeTypePlugin } from './normalizeTypePlugin'

const components = withStyledDraggables(withStyledPlaceHolders(plateUI))

export const Plugins = createPlugins<MyValue>(
  [
    ...basicNodesPlugins,
    createComboboxPlugin(),
    createReactPlugin(),
    createMentionPlugin(mentionPlugin),
    createExitBreakPlugin(exitBreakPlugin),
    createSoftBreakPlugin(softBreakPlugin),
    createResetNodePlugin(resetBlockTypePlugin),
    createIndentPlugin(indentPlugin),
    createIndentListPlugin(indentListPlugin),
    createNodeIdPlugin({ options: { idCreator: () => cuid() } }),
    createDndPlugin({ options: { enableScroller: true } }),
    createFontFamilyPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createLineHeightPlugin(lineHeightPlugin),
    createAlignPlugin(alignPlugin),
    createSelectOnBackspacePlugin({
      options: { query: { allow: [ELEMENT_HR] } },
    }),
    createAutoformatPlugin<AutoformatPlugin<MyValue, MyEditor>, MyValue>(
      autoformatPlugin
    ),
    createEmojiPlugin({
      renderAfterEditable: EmojiCombobox as RenderAfterEditable<MyValue>,
    }),
    createLinkPlugin({
      renderAfterEditable: PlateFloatingLink as RenderAfterEditable<MyValue>,
    }),
  ],
  {
    components,
  }
)
