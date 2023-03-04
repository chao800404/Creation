import { ELEMENT_PARAGRAPH, HeadingPlugin, PlatePlugin } from '@udecode/plate'
import { createPluginFactory } from '@udecode/plate-core'
import { ELEMENT_EH3, KEYS_EHEADING } from '../eHeading-element'
import { withForcedTitleLayout } from '../withWrapper'
import { handleOnKeydown } from './utils/handleOnKeydown'

export const ELEMENT_EXPANDABLE_HEADING_1 = 'expendable_heading1'
export const ELEMENT_EXPANDABLE_HEADING_2 = 'expendable_heading2'
export const ELEMENT_EXPANDABLE_HEADING_3 = 'expendable_heading3'

const KEYS_EXPANDABLE_HEADING = [
  ELEMENT_EXPANDABLE_HEADING_1,
  ELEMENT_EXPANDABLE_HEADING_2,
  ELEMENT_EXPANDABLE_HEADING_3,
]

export const createExpandableHeadingPlugin = createPluginFactory({
  key: 'expandable_heading',
  options: {
    levels: 3,
  },
  then: (editor, { options: { levels = 3 } = {} }) => {
    const plugins = []

    for (let level = 1; level <= levels; level++) {
      const key = KEYS_EXPANDABLE_HEADING[level - 1]
      const plugin = {
        key,
        isElement: true,
        handlers: {
          onKeyDown: handleOnKeydown,
        },
        options: {
          rules: [
            { strictType: KEYS_EHEADING[level - 1] },
            { strictType: ELEMENT_PARAGRAPH },
          ],
        },
        withOverrides: withForcedTitleLayout,
      }

      plugins.push(plugin)
    }

    return {
      plugins,
    }
  },
})
