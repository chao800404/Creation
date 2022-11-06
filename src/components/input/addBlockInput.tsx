import React, { useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { motion } from 'framer-motion'
import BlockInputWrapper from './blockInputWrapper'

const AddBlockInput = () => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)

  const handleKeyDownOnEnter = (e: React.KeyboardEvent) => {
    const targetEnter = e.key === 'Enter'
    const isFocus = document.activeElement === textareaRef.current
    if (isFocus && targetEnter) {
      e.preventDefault()
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
        />
      </AddBlocknputWrapper>
    </BlockInputWrapper>
  )
}

export default AddBlockInput
