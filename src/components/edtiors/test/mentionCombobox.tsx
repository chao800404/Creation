import React, { useEffect, useCallback } from 'react'
import { Data, NoData } from '@udecode/plate-combobox'
import {
  getPluginOptions,
  usePlateEditorRef,
  setElements,
  setNodes,
} from '@udecode/plate-core'
import {
  ELEMENT_MENTION,
  getMentionOnSelectItem,
  MentionPlugin,
  removeMentionInput,
  findMentionInput,
} from '@udecode/plate-mention'
import { Combobox, ComboboxProps } from '@udecode/plate-ui-combobox'
import {
  comboboxStore,
  // ComboboxStateById,
  // useComboboxSelectors,
  getPluginType,
  // getPreventDefaultHandler,
  // usePlateEditorState,
  // useEventPlateId,
  // ELEMENT_H5,
  // insertNodes,
  // ELEMENT_H1,
  // ELEMENT_H2,
  deleteText,
} from '@udecode/plate'
import SelectItem from './selectItem'
import { Item } from './type'
import dynamic from 'next/dynamic'

export interface MentionComboboxProps<Items>
  extends Partial<ComboboxProps<Items>> {
  pluginKey?: string
}

const MentionCombobox = ({
  pluginKey = ELEMENT_MENTION,
  id = pluginKey,
  ...props
}: MentionComboboxProps<Item>) => {
  const editor = usePlateEditorRef()
  const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey)
  const comboboxSelectors = comboboxStore.get
  const comboboxActions = comboboxStore.set

  const handleSelectItem = useCallback(
    (key: string) => {
      if (key) {
        const type = getPluginType(editor, key)
        const currentMentionInput = findMentionInput(editor)
        if (currentMentionInput) {
          deleteText(editor, { at: currentMentionInput[1] })
          removeMentionInput(editor, currentMentionInput[1])
          setElements(editor, { type })
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
      controlled={true}
      onRenderItem={(props) => (
        <SelectItem onClick={handleSelectItem} {...props} />
      )}
      onSelectItem={() => {
        const index = comboboxSelectors.highlightedIndex()
        const items = comboboxSelectors.items()
        const key = items[index]?.key
        handleSelectItem(key)
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
