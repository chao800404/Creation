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
  createImagePlugin,
  createTrailingBlockPlugin,
} from '@udecode/plate'

import { basicNodesPlugins } from '../basic-nodes'
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
import { autoformatPlugin } from '../autoformatBlock'
import { trailingBlockPlugin } from './trailingBlockPlugin'
import { createLinkButton } from '../linkButton'
import { alignPlugin } from './alignPlugin'

import cuid from 'cuid'

import { PopupItems } from '../../../data/popupItems'
import {
  createImageListBlockPlugin,
  ELEMENT_IMAGE_ITEM_BLOCK,
} from '../imageListBlock'
import { createEHeadingPlugin } from '../eHeading-element/eHeadingPlugin'
import { createDescBlock } from '../desc'
import { createExpandableHeadingPlugin } from '../expandableHeading'

// import { normalizeTypePlugin } from './normalizeTypePlugin'

const components = withStyledDraggables(withStyledPlaceHolders(plateUI))

export const Plugins = createPlugins<MyValue>(
  [
    ...basicNodesPlugins,
    createDescBlock(),
    createEHeadingPlugin(),
    createImageListBlockPlugin({
      then: () => ({
        plugins: [
          {
            props: { list: PopupItems },
            key: ELEMENT_IMAGE_ITEM_BLOCK,
          },
        ],
      }),
    }),
    createLinkButton(),
    createComboboxPlugin(),
    createReactPlugin(),
    // createBlockSelectionPlugin(),
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
    // createImagePlugin({
    //   then: () => ({
    //     props: {
    //       list: PopupItems,
    //     },
    //   }),
    // }),

    createFontBackgroundColorPlugin(),
    createLineHeightPlugin(lineHeightPlugin),
    createAlignPlugin(alignPlugin),
    createExpandableHeadingPlugin(),
    createSelectOnBackspacePlugin({
      options: { query: { allow: [ELEMENT_HR] } },
    }),
    createTrailingBlockPlugin(trailingBlockPlugin),
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
