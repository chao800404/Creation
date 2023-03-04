import { createPluginFactory, onKeyDownToggleElement } from '@udecode/plate'

export const ELEMENT_DESC = 'desc-content'

export const createDescBlock = createPluginFactory({
  key: ELEMENT_DESC,
  isElement: true,
  isLeaf: true,
  handlers: {
    onKeyDown: onKeyDownToggleElement,
  },
})
