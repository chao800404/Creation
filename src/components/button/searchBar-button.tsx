import React, { useEffect, useState } from 'react'
// import SearchPopup from '../search/searchPopup'
import { SearchBtnWrapper } from './button.styles'
import { SlMagnifier } from 'react-icons/sl'
import Keyword from '../keywold/keyword'
import SearchPopup from '../popup/searchPopup'

type SearchBarBtnProps = {
  desc: string
}

const SearchBarBtn: React.FC<SearchBarBtnProps> = ({ desc }) => {
  const [toggleOpen, setToggleOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { ctrlKey, key } = e
      if (ctrlKey && key.toUpperCase() === 'K') {
        e.preventDefault()
        console.log(true)
        !toggleOpen && setToggleOpen(true)
      }
    }

    const handleOnClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest(
        '[data-type="serch-button"]'
      )
      const serchBox = (e.target as HTMLElement).closest(
        '[data-type="search-popup"]'
      )

      if (btn || serchBox) {
        return setToggleOpen(true)
      }

      setToggleOpen(false)
    }

    document.addEventListener('click', handleOnClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleOnClick)
    }
  }, [toggleOpen])

  return (
    <>
      <SearchBtnWrapper data-type="serch-button">
        <div className="left_icon">
          <SlMagnifier fontSize="1rem" />
        </div>
        <div>{desc}</div>
        <div className="right_icon">
          <Keyword keyword="K" />
        </div>
      </SearchBtnWrapper>
      <SearchPopup isOpen={toggleOpen} />
    </>
  )
}

export default React.memo(SearchBarBtn)
