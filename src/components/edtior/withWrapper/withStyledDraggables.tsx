import React from 'react'
import { ArrowRight } from '@styled-icons/evaicons-solid/ArrowRight'
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
import { ELEMENT_LINK_BUTTON } from '../linkButton'
import { KeyboardArrowRight } from '@styled-icons/material-rounded/KeyboardArrowRight'
import {
  ELEMENT_IMAGE_ITEM_BLOCK,
  ELEMENT_IMAGE_LIST_BLOCK,
} from '../imageListBlock'
import { ELEMENT_DESC } from '../desc'
import {
  ELEMENT_EXPANDABLE_HEADING_1,
  ELEMENT_EXPANDABLE_HEADING_2,
  ELEMENT_EXPANDABLE_HEADING_3,
} from '../expandableHeading'

const GrabberTooltipContent = React.memo(() => {
  return (
    <ToolContainerWrapper>
      <span>
        Drag or <span>( click )</span>
      </span>
    </ToolContainerWrapper>
  )
})

GrabberTooltipContent.displayName = 'GrabberTooltipContent'

export const grabberTooltipProps: TippyProps = {
  content: <GrabberTooltipContent />,
  theme: 'dark',
  arrow: false,
  placement: 'top',
  delay: [1000, 0],
}

const TippyDrag = () => (
  <Tippy {...grabberTooltipProps}>
    <DragButtonWrapper contentEditable={false} type="button">
      <KeyboardArrowRight height="1rem" />
    </DragButtonWrapper>
  </Tippy>
)

export const withStyledDraggables = (components: unknown) => {
  return withDraggables(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL, ELEMENT_DESC],
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
        ELEMENT_LINK_BUTTON,
        ELEMENT_IMAGE_LIST_BLOCK,
        ELEMENT_IMAGE_ITEM_BLOCK,
        ELEMENT_EXPANDABLE_HEADING_1,
        ELEMENT_EXPANDABLE_HEADING_2,
        ELEMENT_EXPANDABLE_HEADING_3,
      ],
      onRenderDragHandle: () => {
        return <TippyDrag />
      },
    },
    {
      key: ELEMENT_H1,
      styles: {
        gutterLeft: {
          padding: '1em 0 4px',
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
          padding: '0.8em 0 1px',
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
          padding: '0.6em 0 1px',
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
    {
      key: ELEMENT_IMAGE,
      styles: {
        block: {
          overflow: 'unset',
        },
      },
    },
    {
      key: ELEMENT_LINK_BUTTON,
      styles: {
        block: {
          overflow: 'unset',
        },
      },
    },
    {
      key: ELEMENT_TABLE,
      styles: {
        block: {
          overflow: 'unset',
        },
      },
    },
    {
      key: ELEMENT_IMAGE_LIST_BLOCK,
      styles: {
        block: {
          overflow: 'unset',
        },
        gutterLeft: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    {
      key: ELEMENT_EXPANDABLE_HEADING_1,
      styles: {
        block: {
          overflow: 'unset',
        },
        gutterLeft: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    {
      key: ELEMENT_EXPANDABLE_HEADING_2,
      styles: {
        block: {
          overflow: 'unset',
        },
        gutterLeft: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    {
      key: ELEMENT_EXPANDABLE_HEADING_3,
      styles: {
        block: {
          overflow: 'unset',
        },
        gutterLeft: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  ])
}
