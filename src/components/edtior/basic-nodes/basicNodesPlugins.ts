import { basicElementsPlugins } from '../basic-elements/basicMarksPlugins'
import { basicMarksPlugins } from '../basic-marks/basicMarksPlugins'
import { plateUI } from '../common/plateUI'
import { createMyPlugins } from '../plateTypes'
import { listElementsPlugins } from '../list-elements/listNodePlugin'

export const basicNodesPlugins = createMyPlugins(
  [...basicElementsPlugins, ...basicMarksPlugins, ...listElementsPlugins],
  {
    components: plateUI,
  }
)
