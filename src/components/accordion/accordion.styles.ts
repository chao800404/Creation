import styled from 'styled-components'
import { motion } from 'framer-motion'

export const AccordionWrapper = styled(motion.div)`
  padding: ${({ theme: { padding } }) => `0 ${padding.pd_sm}`};
  font-size: inherit;
  font-weight: inherit;

  .accordion_content {
    color: inherit;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
    font-weight: 600;
  }
`
