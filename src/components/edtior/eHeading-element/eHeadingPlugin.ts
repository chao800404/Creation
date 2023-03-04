import { HeadingPlugin, HeadingsPlugin } from '@udecode/plate'
import {
  createPluginFactory,
  onKeyDownToggleElement,
  PlatePlugin,
} from '@udecode/plate-core'
import { KEYS_EHEADING } from './constants'

export const createEHeadingPlugin = createPluginFactory<HeadingsPlugin>({
  key: 'eheading',
  options: {
    levels: 3,
  },
  then: (editor, { options: { levels = 3 } = {} }) => {
    const plugins: PlatePlugin<HeadingPlugin>[] = []

    for (let level = 1; level <= levels; level++) {
      const key = KEYS_EHEADING[level - 1]
      const plugin: PlatePlugin<HeadingPlugin> = {
        key,
        isElement: true,
        deserializeHtml: {
          rules: [
            {
              validNodeName: `EH${level}`,
            },
          ],
        },
        handlers: {
          onKeyDown: onKeyDownToggleElement,
        },
        options: {},
      }

      plugins.push(plugin)
    }

    return {
      plugins,
    }
  },
})
