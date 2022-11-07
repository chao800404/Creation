import React, { ChangeEventHandler, useRef } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import BlockInputWrapper from './blockInputWrapper'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'

const AddBlockInput = () => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)
  const { filterBlocksMapSet, showSet } = useBlocksStore(
    (state) => ({
      filterBlocksMapSet: state.filterBlocksMapSet,
      showSet: state.showSet,
    }),
    shallow
  )

  const handleKeyDownOnEnter = (e: React.KeyboardEvent) => {
    const isFocus = document.activeElement === textareaRef.current

    if (isFocus) {
      const { blocksMap } = useBlocksStore.getState()
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          break
        case '/':
          showSet(true)
          break
      }
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const isFocus = document.activeElement === textareaRef.current
    const value = e.target.value.toLowerCase()
    if (value.startsWith('/') && isFocus) {
      const blockName = value.replace('/', '')
      filterBlocksMapSet(blockName)
    }
  }

  return (
    <BlockInputWrapper>
      <AddBlocknputWrapper>
        <ReactTextareaAutosize
          placeholder="Type '/'for commands"
          className="add_block-input"
          ref={textareaRef}
          onKeyDown={handleKeyDownOnEnter}
          onChange={handleOnChange}
        />
      </AddBlocknputWrapper>
    </BlockInputWrapper>
  )
}

export default AddBlockInput
