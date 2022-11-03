import styled from 'styled-components'
import { motion } from 'framer-motion'

// export const HeaderEditorWrapper = styled('div')`
//   .header_editor-content {
//     width: 100%;
//     padding: 0.5rem 0.5rem;
//     height: 2.5rem;
//     position: relative;
//     display: flex;
//     background-color: #1c1c1c;
//     color: #696969;
//     border-radius: 5px;
//     gap: 0.5rem;
//     align-items: center;

//     &:before {
//       position: absolute;
//       content: '';
//       width: 1rem;
//       height: 1rem;
//       background-color: #1c1c1c;
//       bottom: calc(-50% + 0.3rem);
//       left: 50%;
//       transform: translate(-50%, -50%) rotate(45deg);
//       z-index: -1;
//     }
//   }

//   .header_editor-gap-line {
//     height: 100%;
//     width: 1px;
//     background-color: #5c5c5c;
//   }
//   .header_editor-add-cover {
//     display: flex;
//     align-items: center;

//     span {
//       display: block;
//       margin-left: 0.5rem;
//     }
//   }

//   .ProseMirror {
//     width: 100%;
//   }

//   .ProseMirror h1.is-editor-empty:first-child::before {
//     content: attr(data-placeholder);
//     float: left;
//     width: 40rem;
//     color: #e3e3e3;
//     pointer-events: none;
//     position: absolute;
//     left: 0;
//   }
// `
export const HeaderEditorSWrapper = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.2rem;
  height: fit-content;
  position: relative;

  .headierEditor_popup {
    position: absolute;
    left: 0;
    width: fit-content;
    padding: 0.5rem 0.5rem;
    height: 2.5rem;
    display: flex;
    background-color: #1c1c1c;
    color: #696969;
    border-radius: 5px;
    gap: 0.5rem;
    align-items: center;
    z-index: 500;
    top: -3rem;
  }

  .headerEditor_icon {
    position: relative;
    grid-column: 1 / 2;
    width: 3.5rem;
    height: 3.5rem;
    align-self: center;
    justify-self: center;

    &-popup {
      position: absolute;
      top: 4rem;
    }
  }

  .headerEditor_content {
    width: 100%;
    grid-column: 2 / -1;
    font-size: 2rem;
    align-self: center;
    border: none;
    outline: none;
    font-weight: 700;
    font-family: Roboto;
    resize: none;
    font-size: 2.3rem;

    &::placeholder {
      color: #c3c3c3;
    }
  }

  .header_editor-gap-line {
    height: 100%;
    width: 1px;
    background-color: #5c5c5c;
  }

  .header_editor-add-cover {
    display: flex;
    align-items: center;
    width: fit-content;

    span {
      display: block;
      margin-left: 0.5rem;
      width: 4rem;
    }
  }
`
