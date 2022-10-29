import React from 'react'
import { KeyboardWrapper } from './keyword.style'

const Keyword = ({ keyword }: { keyword: string }) => {
  return (
    <KeyboardWrapper>
      <span className="keyboard_keyword">CTRL</span>
      <span className="keyboard_plus">+</span>
      <span className="keyboard_keyword">{keyword}</span>
    </KeyboardWrapper>
  )
}

export default Keyword
