import React, { useEffect, useMemo, useState } from 'react'
import { editableProps } from './common/editableProps'
import {
  Plate,
  Combobox,
  usePlateEditorState,
  usePlateEditorRef,
  Toolbar,
  focusEditor,
  usePlateSelectors,
  getStartPoint,
  usePlateActions,
} from '@udecode/plate'
import { MyValue, MyParagraphElement, MyRootBlock } from './plateTypes'
import { Plugins } from './plugins/plugins'
import { MarkBalloonToolbar } from './balloon-toolbar/MarkBalloonToolbar'
import getSuggestionItems from './test/items'
import { ELEMENT_PARAGRAPH, PlateProvider } from '@udecode/plate'
import { PlateEditorWrapper } from './styles'
import ToolbarButtons from './ToolbarButtons'
import cuid from 'cuid'
import { usePageControllerStore } from '../../store'
import { shallow } from 'zustand/shallow'
import dynamic from 'next/dynamic'

const MentionCombobox = dynamic(() => import('./test/mentionCombobox'))

const initialValue: MyValue = [
  { type: ELEMENT_PARAGRAPH, children: [{ text: '' }], id: cuid() },
]

const Editor = () => {
  const [debugValue, setDebugValue] = useState<MyValue | null>(null)
  const editor = usePlateEditorRef()
  const [onChange, setOnChange] = useState(false)
  const dashboardMainWidths = usePageControllerStore(
    (state) => state.dashboardMainWidth,
    shallow
  )

  const items = useMemo(() => getSuggestionItems, [])

  useEffect(() => {
    if (debugValue && !onChange) {
      const { type } = debugValue[0]
      setOnChange(!(type === ELEMENT_PARAGRAPH))
    }
  }, [debugValue, onChange])

  return (
    <PlateProvider<MyValue>
      onChange={(value) => setDebugValue(value)}
      initialValue={initialValue}
      plugins={Plugins}
      normalizeInitialValue={true}
    >
      <Plate editableProps={editableProps({ onChange })}>
        <MentionCombobox items={items} pluginKey="/" />
      </Plate>
      <Toolbar style={{ width: `calc(${dashboardMainWidths - 110}px)` }}>
        <ToolbarButtons />
      </Toolbar>
    </PlateProvider>
  )
}

export default Editor
