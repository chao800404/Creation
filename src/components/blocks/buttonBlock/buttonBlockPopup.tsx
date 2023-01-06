import React, { useState, useRef, useMemo } from 'react'
import { ButtonBlockPopupProps } from './type'
import { ResDataType } from '../../../hook/useListSWR'
import { httpParser } from '../../../utils/filterFile'
import { useKeydownStore } from '../../../store/useKeydownStore'
import shallow from 'zustand/shallow'
import WrapperScrollbar from '../../scroll/wrapperScrollbar'
import { ButtonBlockPopupListItem } from './nodeItem'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import { ButtonBlockPopupWrapper } from './buttonBlock.styles'

export const ButtonBlockPopup: React.FC<ButtonBlockPopupProps<ResDataType>> = ({
  list,
  linkSet,
  toggleOpen,
  history,
  toggleNewTab,
  newTab,
  link,
  nameSet,
  linkIdSet,
}) => {
  const [linkType, setLinkType] = useState<'internal' | 'external'>(
    httpParser(link) ? 'external' : 'internal'
  )

  const [searchFields, setSearchFields] = useState<null | string>(null)
  const [externalLink, setExternalLink] = useState(link)
  const [error, setError] = useState(!httpParser(link))
  const checkRef = useRef<HTMLInputElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const i = useKeydownStore((state) => state.index, shallow)

  const filterFields = useMemo(() => {
    return (
      (searchFields &&
        list.filter((item) =>
          item.text?.toLowerCase().includes(searchFields?.toLowerCase())
        )) ||
      []
    )
  }, [list, searchFields])

  const favoriteList = list.filter((item) => item.data?.favorite)
  const internal = linkType === 'internal'
  const filterDocs = !searchFields ? history : filterFields

  const length = internal
    ? filterDocs.length + favoriteList.length
    : filterDocs.length

  const handleSubmit = () => {
    const checkBox = checkRef.current

    if (!error && checkBox) {
      linkSet(externalLink)
      toggleNewTab(checkBox.checked)
      nameSet(externalLink.split('.')[1])
      toggleOpen()
      linkIdSet('')
    }
  }

  return (
    <ButtonBlockPopupWrapper
      className="round_sm"
      onClick={() => inputRef.current?.focus()}
      tabIndex={0}
      onKeyDown={(e) => {
        const { handleOnKeydown } = useKeydownStore.getState()
        const position = inputRef.current?.selectionStart

        handleOnKeydown({
          keyCode: e.code,
          length,
          onEnter: () => {
            const item = [...filterDocs, ...favoriteList][i]
            if (internal && item) {
              linkSet(item.id as string)
              nameSet(
                item.text && item.text.length > 0 ? item.text : 'Untitled'
              )
              linkIdSet(item.id as string)
              toggleOpen()
            } else if (!internal) handleSubmit()
          },
          onLeft: () => position === 0 && setLinkType('internal'),

          onRight: () =>
            (position === searchFields?.length || searchFields === null) &&
            setLinkType('external'),

          onEsc: () => toggleOpen(false),
        })
      }}
    >
      <div
        className={`popup_label center ${internal && `active`}`}
        onClick={() => setLinkType('internal')}
      >
        <span>INTERNAL LINK</span>
      </div>
      <div
        className={`popup_label center ${!internal && `active`}`}
        onClick={() => setLinkType('external')}
      >
        <span>EXTERNAL LINK</span>
      </div>
      <div className="popup_container">
        {internal ? (
          <>
            <input
              type="text"
              placeholder="Search Docs"
              ref={inputRef}
              autoFocus={true}
              defaultValue={searchFields || ''}
              onChange={(e) => {
                const { reset } = useKeydownStore.getState()
                if (i !== 0) reset()
                e.target.value.length === 0
                  ? setSearchFields(null)
                  : setSearchFields(e.target.value)
              }}
            />

            <WrapperScrollbar move={i * 45}>
              <div className="popup_field-name ">
                {!searchFields ? 'RECENT DOCS' : 'FILTER DOCS'}
              </div>
              {filterDocs?.map((item, index) => {
                const hasChild = list.some((i) => i.parent === item.id)
                const parentNode = list.find((i) => i.id === item.parent)

                return (
                  <ButtonBlockPopupListItem
                    key={item.id}
                    hasChild={hasChild}
                    node={item}
                    parentNode={parentNode}
                    onClick={() => {
                      linkSet(item.id as string)
                      nameSet(item.text)
                      linkIdSet(item.id as string)
                      toggleOpen()
                    }}
                    searchFields={searchFields}
                    isActive={index === i}
                  />
                )
              })}
              {!searchFields && favoriteList && (
                <>
                  <div className="popup_field-name ">FAVORITE DOCS</div>
                  {favoriteList.map((item, index) => {
                    const hasChild = list.some((i) => i.parent === item.id)
                    const parentNode = list.find((i) => i.id === item.parent)
                    return (
                      item.data?.favorite && (
                        <ButtonBlockPopupListItem
                          key={item.id}
                          hasChild={hasChild}
                          node={item}
                          parentNode={parentNode}
                          onClick={() => {
                            linkSet(item.id as string)
                            nameSet(item.text)
                            linkIdSet(item.id as string)
                            toggleOpen()
                          }}
                          isFavorite={true}
                          searchFields={searchFields}
                          isActive={index + filterDocs.length === i}
                        />
                      )
                    )
                  })}
                </>
              )}
            </WrapperScrollbar>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <div className="form_input">
              <label className="checkIcon center">
                {error ? (
                  <AiOutlineCloseCircle color="red" />
                ) : (
                  <BsCheckLg color="green" />
                )}
              </label>
              <input
                type="text"
                ref={inputRef}
                placeholder="Set link"
                autoFocus={true}
                id="link_input"
                defaultValue={externalLink === '/' ? '' : externalLink}
                onChange={(e) => {
                  const value = e.target.value
                  setError(!(httpParser(value) || value.length === 0))
                  setExternalLink(value)
                }}
              />
            </div>

            <div className="form_body">
              <div className="form_error">
                <p>ex. https://www.google.com/</p>
              </div>
              <div className="newTab">
                <label htmlFor="newTab">Opens new tab</label>
                <input
                  id="newTab_input"
                  defaultChecked={newTab}
                  name="newTab"
                  type="checkbox"
                  ref={checkRef}
                />
              </div>
            </div>

            <button className="center">SET LINK</button>
          </form>
        )}
      </div>
    </ButtonBlockPopupWrapper>
  )
}
