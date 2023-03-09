import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { editableProps } from './common/editableProps'
import { Plate, Toolbar } from '@udecode/plate'
import { MyValue } from './plateTypes'
import { Plugins } from './plugins/plugins'
import getSuggestionItems from './mention/items'
import { ELEMENT_PARAGRAPH, PlateProvider } from '@udecode/plate'
import ToolbarButtons from './ToolbarButtons'
import cuid from 'cuid'
import dynamic from 'next/dynamic'
import { EditorWrapper } from './styles'
import { updateData } from '@/utils/fetch'
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import { differenceBy } from 'lodash'
import { useRouter } from 'next/router'
import { UpdateNode } from '@/hook/type'
import { useStatusStore } from '@/store/useStatusStore'
import { shallow } from 'zustand/shallow'
import { useReadOnly } from 'slate-react'
import { MENTIONABLES } from '@/data/mentionData'

const MentionCombobox = dynamic(() => import('./mention/mentionCombobox'))

const initialValue: MyValue = [
  { type: ELEMENT_PARAGRAPH, children: [{ text: '' }], id: cuid() },
]

const Editor = ({
  editable,
  pageId,
  node,
  updateNode,
}: {
  editable: boolean
  pageId: string
  node: MyValue
  updateNode: UpdateNode<MyValue>
}) => {
  const [debugValue, setDebugValue] = useState<MyValue | null>(null)
  const [onChange, setOnChange] = useState(false)
  const status = useStatusStore((state) => state.status, shallow)
  const items = useMemo(() => getSuggestionItems, [])

  const renderElement = useMemo(() => Plugins(), [])

  const debounced = useDebouncedCallback((value) => {
    if (value !== node && (status === 'success' || status === 'normal')) {
      updateNode({ pageId, value })
    }
  }, 1000)

  // useEffect(() => {
  //   if (debugValue && !onChange && node) {
  //     const { type } = debugValue[0]
  //     setOnChange(!(type === ELEMENT_PARAGRAPH))
  //   }
  // }, [debugValue, onChange, node])

  return (
    <EditorWrapper>
      <PlateProvider<MyValue>
        onChange={(value) => {
          setDebugValue(value)
          debounced(value)
        }}
        initialValue={node}
        plugins={renderElement}
        id={pageId}
      >
        <Plate
          id={pageId}
          editableProps={editableProps({
            onChange,
            readOnly: !editable,
          })}
        >
          <MentionCombobox items={items} pluginKey="/" />
          {/* <CursorOverlayContainer containerRef={containerRef} /> */}
          {/* <MentionCombobox items={MENTIONABLES} /> */}
          <div style={{ height: '50vh' }} />
        </Plate>
        {editable && (
          <Toolbar>
            <ToolbarButtons />
          </Toolbar>
        )}
      </PlateProvider>
    </EditorWrapper>
  )
}

export default Editor
