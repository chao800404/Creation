import React, { useRef, useEffect, useMemo, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { HeaderEditorSWrapper } from './editor.styles'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import EditorOptionButton from '../button/editorOptionButton'
import { useCoverStore } from '../../store'
import { useRouter } from 'next/router'
import { randomPath } from '../../utils/randomPath'
import { shallow } from 'zustand/shallow'
import { usePageSWR } from '../../hook/usePageSWR'
import { BsFillEmojiSunglassesFill } from 'react-icons/bs'
import { FaImage } from 'react-icons/fa'
import { MdOutlineTitle } from 'react-icons/md'
import EmojiContainer from '../container/emojiContainer'
import { useListSWR } from '../../hook/useListSWR'
import useOnClickOutside from '../../utils/useOnClickOutside'
import { EMOJI_BASE } from '../../utils/config'
import ChangePopup from '../popup/changePopup'

type Level = 1 | 2

const fontColor = (image: string) =>
  (image && image.length > 0 && '#EFEFEF') || ''

const HeaderEditorS = () => {
  const { page } = useRouter().query
  const id = (page && (page[0] as string)) || ''
  const {
    mutateFunction,
    data: { cover },
  } = usePageSWR(id)

  const {
    mutateFunction: { updatePageEmoji, updatePageConfig },
    data: { emoji, title: dataTitle },
  } = useListSWR(id)

  const coverImageMap = useCoverStore((state) => state.coverImageMap, shallow)
  const [shouldeShow, setShouldShow] = useState(false)
  const [headerLevel, setHeaderLevel] = useState(1)
  const [toggleEmojiPopup, setToggleEomjiPopup] = useState(false)
  const [title, setTitle] = useState(dataTitle)
  const firstLoad = useRef(true)

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
        return mutateFunction.uploadCoverImage(randomPath)
      }
    }
    return mutateFunction.uploadCoverImage('')
  }

  const handleChangeHeaderLevel = (level: Level) => {
    setHeaderLevel(level)
  }

  const handleAddEmoji = () => {
    if (!emoji) {
      const randomInt = randomPath(EMOJI_BASE.length)
      if (randomInt <= EMOJI_BASE.length) {
        const randomPath = EMOJI_BASE[randomInt]
        return updatePageEmoji(id, randomPath)
      }
    }
    return updatePageEmoji(id, '')
  }

  useEffect(() => {
    if (!firstLoad.current && dataTitle !== title && title) {
      const timeout = setTimeout(() => {
        updatePageConfig(id, 'title', title)
      }, 1000)

      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  useEffect(() => {
    setTitle(dataTitle)
  }, [dataTitle])

  useOnClickOutside((e) => {
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
      setToggleEomjiPopup(false)
      emoji && updatePageEmoji(id, emoji)
    }
  })

  return (
    <HeaderEditorSWrapper
      opacity={shouldeShow ? 1 : 0}
      popupOpen={toggleEmojiPopup}
    >
      <div className="headierEditor_popup">
        <EditorOptionButton
          color={fontColor(emoji || '')}
          onClick={handleAddEmoji}
        >
          <div style={{ position: 'relative' }}>
            {emoji && <span className="remove_cover" />}
            <BsFillEmojiSunglassesFill fontSize="1.2rem" />
          </div>
        </EditorOptionButton>
        <span className="header_editor-gap-line" />

        <EditorOptionButton
          onClick={handleAddCover}
          color={fontColor(cover || '')}
        >
          <div className="header_editor-add-cover">
            <FaImage fontSize="1.25rem" />
            <span>{cover ? 'Remove' : 'Add cover'}</span>
          </div>
        </EditorOptionButton>
        <span className="header_editor-gap-line" />

        <EditorOptionButton
          color={(headerLevel === 1 && '#EFEFEF') || ''}
          onClick={() => handleChangeHeaderLevel(1)}
        >
          <MdOutlineTitle fontSize="1.5rem" />
        </EditorOptionButton>

        <EditorOptionButton
          color={(headerLevel === 2 && '#EFEFEF') || ''}
          onClick={() => handleChangeHeaderLevel(2)}
        >
          <MdOutlineTitle fontSize="1.25rem" />
        </EditorOptionButton>
      </div>

      {emoji && (
        <div
          className="headerEditor_icon"
          style={{
            width: headerLevel === 1 ? '3.5rem' : '2rem',
            height: headerLevel === 1 ? '3.5rem' : '2rem',
          }}
        >
          <AnimatePresence>
            {toggleEmojiPopup && (
              <motion.div
                id="headerEditor_icon-popup"
                className="headerEditor_icon-popup"
              >
                <ChangePopup tabs={['emoji', 'upload']}>
                  <EmojiContainer />
                </ChangePopup>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            alt="emoji"
            layout="fill"
            objectFit="cover"
            id="emoji_image"
            src={emoji}
            unoptimized
          />
        </div>
      )}

      <ReactTextareaAutosize
        placeholder="Title"
        className="headerEditor_content"
        onFocus={() => {
          setShouldShow(true)
          firstLoad.current = false
        }}
        onBlur={() => setShouldShow(false)}
        style={{
          fontSize: headerLevel === 1 ? '2.3rem' : '1.8rem' || '2.3rem',
        }}
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)}
      />
    </HeaderEditorSWrapper>
  )
}

export default HeaderEditorS
