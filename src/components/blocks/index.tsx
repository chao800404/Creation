import { BLOCK_SELECTOR } from '../../utils/config'
import BaseBlock from './baseBlock'
import CodeBlockContent from './codeBlockContent'
import TableBlock from './tableBlock'
import ButtonBlock from './buttonBlock'
import { BaseBlockType } from './type'

// export { default as BaseBlock } from './baseBlock'
// export { default as ButtonBlock } from './buttonBlock'
// export { default as CodeBlock } from './codeBlockContent'
// export { default as TableBlock } from './tableBlock'

const BlockContent = (props: BaseBlockType) => {
  switch (props.blockData.name) {
    case BLOCK_SELECTOR[8].name:
      return <CodeBlockContent {...props} />
    case BLOCK_SELECTOR[4].name:
      return <TableBlock {...props} />
    case BLOCK_SELECTOR[9].name:
      return <ButtonBlock {...props} />
    default:
      return <BaseBlock {...props} />
  }
}

export { BaseBlock, CodeBlockContent, TableBlock, BlockContent, ButtonBlock }
