import styled from 'styled-components'

type HeaderEditorType = {
  opacity: number
  popupOpen: boolean
}

export const HeaderEditorSWrapper = styled('div').attrs<HeaderEditorType>(
  (props) => ({
    opacity: props.opacity,
    popupOpen: props.popupOpen,
  })
)<HeaderEditorType>`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  height: fit-content;
  position: relative;
  padding: 0.5rem 0 0 0;

  &:hover {
    .headierEditor_popup {
      transition: 0.5s ease-out;
    }
  }

  .headierEditor_popup {
    position: absolute;
    left: 0;
    width: fit-content;
    padding: 0.5rem 0.5rem;
    height: 2.5rem;
    display: flex;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #696969;
    border-radius: 5px;
    gap: 0.5rem;
    align-items: center;
    z-index: 500;
    top: -2.5rem;
    opacity: ${({ opacity }) => opacity};

    div {
      span.remove_cover {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        &::after {
          content: '';
          width: 100%;
          height: 2px;
          position: absolute;
          top: 50%;
          left: 0;
          background-color: red;
          transform: translateY(-50%) rotate(45deg);
        }
      }
    }
  }

  .headerEditor_icon {
    position: relative;
    grid-column: 1 / 2;
    width: 3.5rem;
    height: 3.5rem;
    align-self: center;
    justify-self: center;
    margin-right: 1.5rem;
    cursor: pointer;

    &-popup {
      position: absolute;
      top: 4rem;
      z-index: 100;
    }
  }

  .headerEditor_content {
    width: 100%;
    grid-column: 2 / -1;
    align-self: center;
    font-size: 2.5rem;
    font-family: 'Inter Tight', sans-serif;
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
