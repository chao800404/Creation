import React, { useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { motion } from 'framer-motion'

const AddBlockInput = () => {
  const [isFocus, setIsFocus] = useState(false)
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)

  const handleOnClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  return (
    <AddBlocknputWrapper>
      <motion.div
        animate={{ opacity: isFocus ? 1 : 0 }}
        className="add_block-icon"
        onClick={handleOnClick}
      >
        <BsFillPlusCircleFill className="add_block-icon-content" />
      </motion.div>

      <ReactTextareaAutosize
        placeholder="Type '/'for commands"
        className="add_block-input"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        ref={textareaRef}
      />
    </AddBlocknputWrapper>
  )
}

export default AddBlockInput
