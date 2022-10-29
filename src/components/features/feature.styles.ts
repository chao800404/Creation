import styled from 'styled-components'
import { motion } from 'framer-motion'

const UploadImageFeatureWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  position: relative;
  border: dashed #dedede;

  .uploadImageFeature-content {
    position: absolute;
    width: 80%;
    height: 90%;
  }

  .uploadImageFeature-desc {
    position: absolute;
    bottom: 1.5rem;
  }

  .uploadImageFeature-desc-1 {
    margin-top: 0.9rem;

    span {
      text-align: center;
      display: block;

      &:last-child {
        font-size: 0.5rem;
        font-weight: 400;
      }
    }
  }

  .uploadImageFeature-motion {
    width: 100%;
  }
`

export { UploadImageFeatureWrapper }
