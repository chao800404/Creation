import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import BlockInputWrapper from './blockInputWrapper'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'
import Heading from '../blocks/heading'

const AddBlockInput = () => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)
  const [filterError, setFilterError] = useState(0)
  const [isEmpty, setIsEmpty] = useState(true)
  const [value, setValue] = useState('')
  const {
    filterBlocksMapSet,
    popupShowSet,
    filterBlocks,
    focusIndexSet,
    focusIndex,
  } = useBlocksStore(
    (state) => ({
      filterBlocksMapSet: state.filterBlocksMapSet,
      popupShowSet: state.popupShowSet,
      filterBlocks: state.filterBlocks,
      focusIndexSet: state.focusIndexSet,
      focusIndex: state.focusIndex,
    }),
    shallow
  )

  const handleKeyDownOnEnter = (e: React.KeyboardEvent) => {
    const isFocus = document.activeElement === textareaRef.current

    if (isFocus) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          break
        case '/':
          popupShowSet(true)
          setFilterError(0)
          break
      }
    }
  }

  useEffect(() => {
    if (filterBlocks.length <= 0) {
      return setFilterError((prev) => prev + 1)
    }
  }, [filterBlocks])

  useEffect(() => {
    if (filterError > 2) {
      return popupShowSet(false)
    }
  }, [filterError, popupShowSet])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [isEmpty])

  const memoEmptySet = useCallback((toggle: boolean) => setIsEmpty(toggle), [])

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const isFocus = document.activeElement === textareaRef.current
    const value = e.target.value.toLowerCase()
    if (value.startsWith('/') && isFocus) {
      const blockName = value.replace('/', '')
      filterBlocksMapSet(blockName)
      focusIndexSet(0)
    } else {
      setIsEmpty(false)
      setValue(e.target.value)
    }
    if (value.length <= 0 && isFocus) {
      popupShowSet(false)
    }
  }

  return (
    <BlockInputWrapper>
      <AddBlocknputWrapper>
        {isEmpty ? (
          <ReactTextareaAutosize
            placeholder="Type '/'for commands"
            className="add_block-input"
            ref={textareaRef}
            onKeyDown={handleKeyDownOnEnter}
            onChange={handleOnChange}
          />
        ) : (
          <Heading value={value} memoEmptySet={memoEmptySet} />
        )}
      </AddBlocknputWrapper>
    </BlockInputWrapper>
  )
}

export default React.memo(AddBlockInput)
