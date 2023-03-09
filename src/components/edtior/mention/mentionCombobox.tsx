import React from 'react'
import { getPluginOptions, usePlateEditorRef } from '@udecode/plate-core'
import { ELEMENT_MENTION, MentionPlugin } from '@udecode/plate-mention'
import { Combobox, ComboboxProps } from '@udecode/plate-ui-combobox'
import { TComboboxItem } from '@udecode/plate'
import SelectItem from './selectItem'
import { Item, Command } from './type'
import { getMentionOnSelectItem } from './utils/getMentionOnSelectItem'

export interface MentionComboboxProps<Items>
  extends Partial<ComboboxProps<Items>> {
  pluginKey?: string
}

export type ComboboxItem = {
  command: Command
} & TComboboxItem

const MentionCombobox = ({
  pluginKey = ELEMENT_MENTION,
  id = pluginKey,
  ...props
}: MentionComboboxProps<Item>) => {
  const editor = usePlateEditorRef()
  const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey)
  return (
    <Combobox
      id={id}
      trigger={trigger || '/'}
      controlled
      onRenderItem={(props) => <SelectItem {...props} />}
      onSelectItem={getMentionOnSelectItem({
        key: pluginKey,
      })}
      styles={{
        root: {
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
          border: '2px solid #1c1c1c',
          borderRadius: '5px',
        },
      }}
      {...props}
    />
  )
}

export default MentionCombobox
