import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import { httpParser } from '../../../utils/filterFile'
import { BaseImageProps, ImagePopupItemProps } from '../image/type'
import { ExteranlLinkElem } from './blockPopup.styles'
import { InternalLinkProps } from './type'

const ExternalLink = forwardRef<
  HTMLInputElement,
  InternalLinkProps<
    ImagePopupItemProps,
    BaseImageProps<unknown>['handleUrlSet']
  >
>(function ExternalLink(props, ref) {
  const [error, setError] = useState(false)

  const handleSubmit = (link: string) => {
    const parseLink = httpParser(link)
    const { handleUrlSet } = props
    if (parseLink) {
      handleUrlSet({ src: link })
    } else {
      setError(true)
    }
  }

  return (
    <ExteranlLinkElem
      onSubmit={(e) => {
        e.preventDefault()
        if (ref) {
          const inputElem = (ref as React.RefObject<HTMLInputElement>).current
          !!inputElem && handleSubmit(inputElem.value)
        }
      }}
    >
      <div className="form_input">
        <label className="checkIcon center">
          {error && <AiOutlineCloseCircle color="red" />}
        </label>
        <input
          type="text"
          placeholder="Set link"
          autoFocus={true}
          id="link_input"
          ref={ref}
          onChange={() => setError(false)}
        />
      </div>

      <div className="form_body">
        <p>ex. https://www.google.com/</p>
      </div>

      <button className="center">SET LINK</button>
    </ExteranlLinkElem>
  )
})

export default ExternalLink
