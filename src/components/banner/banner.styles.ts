import styled from 'styled-components'
import { motion } from 'framer-motion'

const DashboardBannerWrapper = styled(motion.div)`
  width: inherit;
  height: 17rem;
  position: relative;

  .Dashboard_Banner-controller-p {
    width: 100%;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    height: inherit;
  }

  .Dashboard_Banner-controller-cover {
    position: absolute;
    width: 100%;
    height: inherit;
    z-index: 100;
    pointer-events: none;
    display: flex;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: inset 0 -0.2rem 0.5rem rgba(0, 0, 0, 0.4);

    &-btn {
      margin: auto;
      background-color: #1c1c1c;
      color: #ffffff;
      width: fit-content;
      height: fit-content;
      padding: 1rem 1.5rem;
      font-size: 0.8rem;
      font-weight: 900;
    }
  }

  .Dashboard_Banner-controller-btn {
    width: auto;
    height: auto;
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    z-index: 300;
    display: flex;
    gap: 0.5rem;
    color: white;
    opacity: 0;
    visibility: hidden;

    &-change,
    &-reposition {
      padding: 0.5rem 0.2rem;
      width: 8rem;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 2px;

      p {
        margin: auto;
        text-align: center;
        font-size: 0.5rem;
      }
    }

    &-popup {
      position: absolute;
      left: 0;
      bottom: fit-content;
      transform: translateY(3rem);
    }
  }

  &:hover .Dashboard_Banner-controller-btn {
    opacity: 1;
    transition: 0.3s ease-in-out;
    visibility: visible;
  }
`

export { DashboardBannerWrapper }
