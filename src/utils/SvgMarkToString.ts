import { IconType } from 'react-icons'
import { renderToStaticMarkup } from 'react-dom/server'
import { StyledIcon } from '@styled-icons/styled-icon'
import { createElement } from 'react'

export const reactSvgMarkToString = <I extends StyledIcon>(Component: I) =>
  `data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(
      createElement(Component, { style: { color: 'white' } })
    )
  )}`
