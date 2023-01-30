import {
  createBlockquotePlugin,
  createCodeBlockPlugin,
  createHeadingPlugin,
  createParagraphPlugin,
  createHorizontalRulePlugin,
} from '@udecode/plate'
import { plateUI } from '../common/plateUI'
import { createMyPlugins } from '../plateTypes'

export const basicElementsPlugins = createMyPlugins(
  [
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),
    createParagraphPlugin(),
    createHorizontalRulePlugin(),
  ],
  {
    components: plateUI,
  }
)
