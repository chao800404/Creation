import {
  CodeBlockElement,
  createPlateUI,
  ELEMENT_CODE_BLOCK,
  ELEMENT_DEFAULT,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_LI,
  ELEMENT_LINK,
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
  ELEMENT_TR,
  ELEMENT_UL,
  EmojiCombobox,
  EMOJI_MAX_SEARCH_RESULT,
  EMOJI_TRIGGER,
  EMOJI_TRIGGERING_CONTROLLER_OPTIONS,
  MARK_CODE,
  StyledElement,
  withProps,
} from '@udecode/plate'
import { ImageElement } from '../image/ImageElement'
import { ELEMENT_LINK_BUTTON, LinkButtonElement } from '../linkButton'
import { TableRowElement, TableElement, TableCellElement } from '../table'
import {
  ImageItemBlockElement,
  ImageListBlockElement,
  ELEMENT_IMAGE_LIST_BLOCK,
  ELEMENT_IMAGE_ITEM_BLOCK,
} from '../imageListBlock'
import { ELEMENT_DESC } from '../desc'
import {
  ELEMENT_EXPANDABLE_HEADING_1,
  ELEMENT_EXPANDABLE_HEADING_2,
  ELEMENT_EXPANDABLE_HEADING_3,
  ExpandableHeadingElement,
} from '../expandableHeading'
import { ELEMENT_EH1, ELEMENT_EH2, ELEMENT_EH3 } from '../eHeading-element'
import { TodoListElement } from '../todoList/todoListElement'

export const plateUI = createPlateUI({
  [ELEMENT_CODE_BLOCK]: withProps(CodeBlockElement, {
    styles: {
      root: {
        code: {
          backgroundColor: 'transparent',
        },
      },
    },
  }),
  [ELEMENT_DESC]: withProps(StyledElement, {
    as: 'p',
    styles: {
      root: {
        margin: 0,
        padding: '4px 0',
      },
    },
  }),
  [ELEMENT_H1]: withProps(StyledElement, {
    as: 'h1',
    styles: {
      root: {
        margin: '1em 0 4px',
        fontSize: '1.875em',
        fontWeight: '500',
      },
    },
  }),
  [ELEMENT_H2]: withProps(StyledElement, {
    as: 'h2',
    styles: {
      root: {
        margin: '0.8em 0 4px',
        fontSize: '1.5em',
        fontWeight: '500',
      },
    },
  }),
  [ELEMENT_H3]: withProps(StyledElement, {
    as: 'h3',
    styles: {
      root: {
        margin: '0.6em 0 4px',
        fontSize: '1.25em',
        fontWeight: '500',
      },
    },
  }),
  [ELEMENT_EH1]: withProps(StyledElement, {
    as: 'h1',
    styles: {
      root: {
        fontSize: '1.875em',
        fontWeight: '500',
        marginBottom: '0.25rem',
        marginTop: '0.5rem',
      },
    },
  }),
  [ELEMENT_EH2]: withProps(StyledElement, {
    as: 'h2',
    styles: {
      root: {
        fontSize: '1.5em',
        fontWeight: '500',
        marginBottom: '0.25rem',
        marginTop: '0.5rem',
      },
    },
  }),
  [ELEMENT_EH3]: withProps(StyledElement, {
    as: 'h3',
    styles: {
      root: {
        fontSize: '1.25em',
        fontWeight: '500',
        marginBottom: '0.25rem',
        marginTop: '0.5rem',
      },
    },
  }),

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
        margin: '0.5rem 0 0.5rem 0.5rem',
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
        margin: '0.5rem 0 0.5rem 0.5rem',
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
        padding: '0 5px',
        fontSize: '1rem',
        borderRadius: '2px',
        border: '1px solid rgba(0,0,0,0.3)',
        margin: '0 5px',
      },
    },
  }),
  [ELEMENT_IMAGE]: ImageElement,
  [ELEMENT_LINK_BUTTON]: LinkButtonElement,
  [ELEMENT_TR]: TableRowElement,
  [ELEMENT_TABLE]: TableElement,
  [ELEMENT_TD]: TableCellElement,
  [ELEMENT_IMAGE_LIST_BLOCK]: ImageListBlockElement,
  [ELEMENT_IMAGE_ITEM_BLOCK]: ImageItemBlockElement,
  [ELEMENT_EXPANDABLE_HEADING_1]: ExpandableHeadingElement,
  [ELEMENT_EXPANDABLE_HEADING_2]: ExpandableHeadingElement,
  [ELEMENT_EXPANDABLE_HEADING_3]: ExpandableHeadingElement,
  [ELEMENT_TODO_LI]: TodoListElement,
})
