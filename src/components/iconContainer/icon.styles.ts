import styled from 'styled-components'
import { motion } from 'framer-motion'

export const IconContainerWrapper = styled('div')`
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ControllDataIconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  .controllerIcon {
    gap: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 0.5rem;
    }
  }

  span.controller_bound_line {
    background-color: #888888;
    width: 2px;
    height: 0.6rem;
  }
`
