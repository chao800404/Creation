import styled from 'styled-components'

export const HeaderEditorWrapper = styled('div')`
  .header_editor-content {
    width: 100%;
    padding: 0.5rem 0.5rem;
    height: 2.5rem;
    position: relative;
    display: flex;
    background-color: #1c1c1c;
    color: #696969;
    border-radius: 5px;
    gap: 0.5rem;
    align-items: center;

    &:before {
      position: absolute;
      content: '';
      width: 1rem;
      height: 1rem;
      background-color: #1c1c1c;
      bottom: calc(-50% + 0.3rem);
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      z-index: -1;
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

    span {
      display: block;
      margin-left: 0.5rem;
    }
  }

  .ProseMirror h1.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #e3e3e3;
    pointer-events: none;
    position: absolute;
    left: 0;
  }
`
