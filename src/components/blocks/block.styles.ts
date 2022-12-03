import styled from 'styled-components'

export const CodeBlockWrapper = styled.div`
  width: 100%;
  position: relative;

  &:hover {
    .code-block-option {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease;
      display: flex;
    }
  }

  .code-block-option {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    visibility: hidden;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary};

    .code-copy-btn {
      display: flex;
      align-items: center;
      color: white;
    }

    #code-language {
      width: 5.5rem;
      padding: 0.3rem;
      cursor: pointer;
      margin-left: 0.5rem;

      ::-webkit-scrollbar-thumb {
        background: #888;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      ::-webkit-scrollbar {
        width: 5px;
      }
    }
  }
`

export const TableBlockWrapper = styled.div`
  width: 100%;
  position: relative;
`
