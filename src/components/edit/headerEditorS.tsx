import React, { useMemo, useState, useEffect } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { HeaderEditorSWrapper } from './editor.styles'
import Image from 'next/image'
import { motion } from 'framer-motion'
import EditorOptionButton from '../button/editorOptionButton'
import { useCoverStore, useEmojiStore } from '../../store'
import { useRouter } from 'next/router'
import { randomPath } from '../../utils/randomPath'
import shallow from 'zustand/shallow'
import { usePageSWR } from '../../hook/usePageSWR'
import { BsFillEmojiSunglassesFill } from 'react-icons/bs'
import { FaImage } from 'react-icons/fa'
import { MdOutlineTitle } from 'react-icons/md'
import ChangePopup from '../popup/changePopup'
import EmojiContainer from '../container/emojiContainer'
import { useListSWR } from '../../hook/useListSWR'

const variants = {
  show: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}

type Level = 1 | 2

const HeaderEditorS = () => {
  const { page } = useRouter().query
  const coverImageMap = useCoverStore((state) => state.coverImageMap, shallow)
  const [shouldeShow, setShouldShow] = useState(false)
  const [headerLevel, setHeaderLevel] = useState(1)
  const [toggleEmojiPopup, setToggleEomjiPopup] = useState(false)

  const {
    mutateFution: { updateListEmoji },
    data: { emoji },
  } = useListSWR(page as string)

  const {
    mutateFution,
    data: { cover },
  } = usePageSWR(page as string)

  const emojiMap = useEmojiStore((state) => state.emojiMap, shallow)

  const cacheMap = useMemo(() => {
    const imageArray = []
    for (const imageGroup in coverImageMap) {
      const imagePathArray = coverImageMap[imageGroup]
      imageArray.push(...imagePathArray)
    }
    return imageArray
  }, [coverImageMap])

  const handleAddCover = () => {
    if (!cover) {
      const randomInt = randomPath(cacheMap.length)
      if (randomInt <= cacheMap.length) {
        const randomPath = cacheMap[randomInt]
        mutateFution.uploadCoverImage(page as string, randomPath)
      }
    }
  }

  const handleChangeHeaderLevel = (level: Level) => {
    setHeaderLevel(level)
  }

  const handleAddEmoji = (e: React.MouseEvent) => {
    if (!emoji) {
      const compareEmoji = emojiMap.flatMap((emojis) => emojis)
      const randomInt = randomPath(compareEmoji.length)
      if (randomInt <= compareEmoji.length) {
        const randomPath = compareEmoji[randomInt]
        updateListEmoji(page as string, randomPath.image)
      }
    }
  }

  useEffect(() => {
    const handleOnClick = (e: MouseEvent) => {
      const target = (e.target as HTMLDivElement).closest(
        '#headerEditor_icon-popup'
      )
      const emojiImage = (e.target as HTMLDivElement).closest('#emoji_image')
      const emojiContent = (e.target as HTMLDivElement).closest(
        '[data-type="emoji-content"]'
      )
      if (!target && !emojiContent) setToggleEomjiPopup(false)
      if (emojiImage) setToggleEomjiPopup(true)
      if (emojiContent) {
        const emoji = emojiContent.getAttribute('data-src')
        emoji && updateListEmoji(page as string, emoji)
      }
    }

    document.addEventListener('click', handleOnClick)
    return () => document.removeEventListener('click', handleOnClick)
  }, [page, updateListEmoji])

  return (
    <HeaderEditorSWrapper
      animate={shouldeShow ? 'show' : 'hidden'}
      whileHover={!toggleEmojiPopup ? 'show' : 'hidden'}
      initial="hidden"
    >
      <motion.div variants={variants} className="headierEditor_popup">
        {!emoji && (
          <>
            <EditorOptionButton onClick={handleAddEmoji}>
              <BsFillEmojiSunglassesFill fontSize="1.2rem" />
            </EditorOptionButton>
            <span className="header_editor-gap-line" />
          </>
        )}

        {!cover && (
          <>
            <EditorOptionButton onClick={handleAddCover}>
              <div className="header_editor-add-cover">
                <FaImage fontSize="1.25rem" />
                <span>Add cover</span>
              </div>
            </EditorOptionButton>
            <span className="header_editor-gap-line" />
          </>
        )}

        <EditorOptionButton onClick={() => handleChangeHeaderLevel(1)}>
          <MdOutlineTitle fontSize="1.5rem" />
        </EditorOptionButton>

        <EditorOptionButton onClick={() => handleChangeHeaderLevel(2)}>
          <MdOutlineTitle fontSize="1.25rem" />
        </EditorOptionButton>
      </motion.div>

      {emoji && (
        <div
          className="headerEditor_icon"
          style={{
            width: headerLevel === 1 ? '3.5rem' : '2rem',
            height: headerLevel === 1 ? '3.5rem' : '2rem',
          }}
        >
          <div id="headerEditor_icon-popup" className="headerEditor_icon-popup">
            {toggleEmojiPopup && (
              <ChangePopup tabs={['emoji', 'upload']}>
                <EmojiContainer />
              </ChangePopup>
            )}
          </div>
          <Image
            alt="emoji"
            layout="fill"
            objectFit="cover"
            id="emoji_image"
            src={emoji}
          />
        </div>
      )}

      <ReactTextareaAutosize
        placeholder="Enter something.."
        className="headerEditor_content"
        onFocus={() => setShouldShow(true)}
        onBlur={() => setShouldShow(false)}
        style={{
          fontSize: headerLevel === 1 ? '2.3rem' : '1.8rem' || '2.3rem',
        }}
      />
    </HeaderEditorSWrapper>
  )
}

export default HeaderEditorS
