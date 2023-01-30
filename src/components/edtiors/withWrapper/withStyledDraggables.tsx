import React from 'react'
import { RxDragHandleDots2 } from 'react-icons/rx'
import Tippy, { TippyProps } from '@tippyjs/react'
import { ToolContainerWrapper, DragButtonWrapper } from '../styles'
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
} from '@udecode/plate'
import { withDraggables } from '@udecode/plate-ui-dnd'

const GrabberTooltipContent = () => (
  <ToolContainerWrapper>
    <span>
      Drag or <span>( click )</span>
    </span>
  </ToolContainerWrapper>
)

export const grabberTooltipProps: TippyProps = {
  content: <GrabberTooltipContent />,
  theme: 'dark',
}

export const withStyledDraggables = (components: unknown) => {
  return withDraggables(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      level: 0,
    },
    {
      keys: [
        ELEMENT_PARAGRAPH,
        ELEMENT_BLOCKQUOTE,
        ELEMENT_TODO_LI,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        ELEMENT_IMAGE,
        ELEMENT_OL,
        ELEMENT_UL,
        ELEMENT_TABLE,
        ELEMENT_MEDIA_EMBED,
        ELEMENT_CODE_BLOCK,
      ],
      onRenderDragHandle: () => {
        return (
          <Tippy {...grabberTooltipProps}>
            <DragButtonWrapper
              contentEditable={false}
              className="center"
              type="button"
            >
              <RxDragHandleDots2 />
            </DragButtonWrapper>
          </Tippy>
        )
      },
    },
    {
      key: ELEMENT_H1,
      styles: {
        gutterLeft: {
          padding: '2em 0 4px',
          fontSize: '1.875em',
        },
        blockToolbarWrapper: {
          height: '1.3em',
        },
      },
    },
    {
      key: ELEMENT_H2,
      styles: {
        gutterLeft: {
          padding: '1.4em 0 1px',
          fontSize: '1.5em',
        },
        blockToolbarWrapper: {
          height: '1.3em',
        },
      },
    },
    {
      key: ELEMENT_H3,
      styles: {
        gutterLeft: {
          padding: '1em 0 1px',
          fontSize: '1.25em',
        },
        blockToolbarWrapper: {
          height: '1.3em',
        },
      },
    },
    {
      keys: [ELEMENT_H4, ELEMENT_H5, ELEMENT_H6],
      styles: {
        gutterLeft: {
          padding: '0.75em 0 0',
          fontSize: '1.1em',
        },
        blockToolbarWrapper: {
          height: '1.3em',
        },
      },
    },
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      styles: {
        gutterLeft: {
          padding: '4px 0 0',
          alignItems: 'center',
        },
      },
    },
    {
      key: ELEMENT_BLOCKQUOTE,
      styles: {
        gutterLeft: {
          padding: '18px 0 0',
        },
      },
    },
    {
      key: ELEMENT_CODE_BLOCK,
      styles: {
        gutterLeft: {
          padding: '12px 0 0',
        },
      },
    },
  ])
}
