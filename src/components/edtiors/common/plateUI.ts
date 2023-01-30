import {
  CodeBlockElement,
  createPlateUI,
  ELEMENT_CODE_BLOCK,
  ELEMENT_HR,
  ELEMENT_LI,
  ELEMENT_LINK,
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
  EmojiCombobox,
  EMOJI_MAX_SEARCH_RESULT,
  EMOJI_TRIGGER,
  EMOJI_TRIGGERING_CONTROLLER_OPTIONS,
  MARK_CODE,
  StyledElement,
  withProps,
} from '@udecode/plate'
import { EMOJI_BASE } from '../../../utils/config'

export const plateUI = createPlateUI({
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    styles: {
      root: {
        margin: 0,
        padding: '4px 0',
      },
    },
    prefixClassNames: 'p',
  }),
  [ELEMENT_OL]: withProps(StyledElement, {
    as: 'ol',
    styles: {
      root: {
        margin: '0.5rem 0 1rem 0.5rem',
        paddingInlineStart: '22px',
        li: {
          listStyle: 'number',
          fontSize: '1rem',
          div: {
            marginLeft: '2px',
          },
        },
      },
    },
  }),
  [ELEMENT_UL]: withProps(StyledElement, {
    as: 'ul',
    styles: {
      root: {
        margin: '0.5rem 0 1rem 0.5rem',
        paddingInlineStart: '24px',
        li: {
          listStyle: 'square',
          fontSize: '1rem',
        },
      },
    },
  }),
  [MARK_CODE]: withProps(StyledElement, {
    as: 'code',
    styles: {
      root: {
        background: '#efefef',
        color: '#393939',
        padding: '2px 5px',
        fontSize: '1rem',
        borderRadius: '2px',
        border: '1px solid rgba(0,0,0,0.3)',
        marginRight: '5px',
      },
    },
  }),

  [EMOJI_MAX_SEARCH_RESULT]: withProps(StyledElement, {
    styles: {
      root: {
        backgroundColor: 'red',
      },
    },
  }),
})
