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
import { debounce } from 'lodash'

type Level = 1 | 2

const fontColor = (image: string) =>
  (image && image.length > 0 && '#EFEFEF') || ''

const HeaderEditorS = () => {
  const { page } = useRouter().query
  const coverImageMap = useCoverStore((state) => state.coverImageMap, shallow)
  const [shouldeShow, setShouldShow] = useState(false)
  const [headerLevel, setHeaderLevel] = useState(1)
  const [toggleEmojiPopup, setToggleEomjiPopup] = useState(false)

  const {
    mutateFution: { updateListEmoji, updateListItem },
    data: { emoji, title },
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
        return mutateFution.uploadCoverImage(page as string, randomPath)
      }
    }
    return mutateFution.uploadCoverImage(page as string, '')
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
        return updateListEmoji(page as string, randomPath.image)
      }
    }
    return updateListEmoji(page as string, '')
  }

  const handleOnChange = debounce((e) => {
    const value = e.target.value
    updateListItem(page as string, 'title', value)
  }, 1000)

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
        setToggleEomjiPopup(false)
        emoji && updateListEmoji(page as string, emoji)
      }
    }

    document.addEventListener('click', handleOnClick)
    return () => document.removeEventListener('click', handleOnClick)
  }, [page, updateListEmoji])

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
            unoptimized
          />
        </div>
      )}

      <ReactTextareaAutosize
        placeholder="Enter something.."
        className="headerEditor_content"
        onFocus={() => setShouldShow(true)}
        onBlur={() => setShouldShow(false)}
        onCompositionEnd={(e) => console.log(e)}
        style={{
          fontSize: headerLevel === 1 ? '2.3rem' : '1.8rem' || '2.3rem',
        }}
        defaultValue={title || ''}
        onChange={handleOnChange}
      />
    </HeaderEditorSWrapper>
  )
}

export default HeaderEditorS
