import React, { useEffect, useMemo, useState } from 'react'
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

const MentionCombobox = dynamic(() => import('./mention/mentionCombobox'))

const initialValue: MyValue = [
  { type: ELEMENT_PARAGRAPH, children: [{ text: '' }], id: cuid() },
]

const Editor = ({ editable }: { editable: boolean }) => {
  const [debugValue, setDebugValue] = useState<MyValue | null>(null)
  const [onChange, setOnChange] = useState(false)

  const items = useMemo(() => getSuggestionItems, [])

  useEffect(() => {
    if (debugValue && !onChange) {
      const { type } = debugValue[0]
      setOnChange(!(type === ELEMENT_PARAGRAPH))
    }
  }, [debugValue, onChange])

  console.log(debugValue)

  return (
    <EditorWrapper>
      <PlateProvider<MyValue>
        onChange={(value) => setDebugValue(value)}
        initialValue={initialValue}
        normalizeInitialValue={true}
        plugins={Plugins}
      >
        <Plate editableProps={editableProps({ onChange, readOnly: false })}>
          <MentionCombobox items={items} pluginKey="/" />
          {/* <CursorOverlayContainer containerRef={containerRef} /> */}
        </Plate>
        <Toolbar>
          <ToolbarButtons />
        </Toolbar>
      </PlateProvider>
    </EditorWrapper>
  )
}

export default Editor
