import React, { useCallback } from 'react'
import { getPluginOptions, usePlateEditorRef } from '@udecode/plate-core'
import {
  ELEMENT_MENTION,
  MentionPlugin,
  removeMentionInput,
  findMentionInput,
} from '@udecode/plate-mention'
import { Combobox, ComboboxProps } from '@udecode/plate-ui-combobox'
import {
  comboboxStore,
  deleteText,
  TComboboxItem,
  TComboboxItemWithData,
} from '@udecode/plate'
import SelectItem from './selectItem'
import { Item, Command } from './type'

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

  const comboboxActions = comboboxStore.set

  const handleSelectItem = useCallback(
    (command: Command) => {
      if (!!command) {
        const currentMentionInput = findMentionInput(editor)
        if (currentMentionInput) {
          deleteText(editor, { at: currentMentionInput[1] })
          removeMentionInput(editor, currentMentionInput[1])
          command(editor)
          comboboxActions.reset()
        }
      }
    },
    [comboboxActions, editor]
  )

  return (
    <Combobox
      id={id}
      trigger={trigger || '/'}
      controlled
      onRenderItem={(props) => <SelectItem {...props} />}
      onSelectItem={(editor, item) => {
        if (item) {
          const { command } = item as TComboboxItemWithData<Item> & {
            command: Command
          }
          handleSelectItem(command)
        }
      }}
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
