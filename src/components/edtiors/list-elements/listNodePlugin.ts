import {
  createIndentListPlugin,
  createListPlugin,
  createTodoListPlugin,
} from '@udecode/plate'
import { plateUI } from '../common/plateUI'
import { createMyPlugins } from '../plateTypes'

export const listElementsPlugins = createMyPlugins(
  [createListPlugin(), createTodoListPlugin()],
  {
    components: plateUI,
  }
)
