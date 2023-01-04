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

export const ButtonBlockWrapper = styled.div`
  position: relative;
  button {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    height: 2.2rem;
    gap: 0.2rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 0.3rem;
    overflow: hidden;
    font-weight: 800;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.8);
    transition: all 0.3s ease-in-out;

    &:hover {
      background: ${({ theme }) => theme.colors.primary_dark};
    }

    span {
      &:first-child {
        padding: 0.5rem 0.8rem;
        min-width: 3rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      &:last-child {
        padding: 0.5rem;
        border-left: 1px solid ${({ theme }) => theme.colors.primary_high_2};
        background-color: ${({ theme }) => theme.colors.primary_dark};
      }
    }
  }

  .button_block-popup {
    position: absolute;
    bottom: -15.5rem;
    z-index: 10;
  }
`

export const ButtonBlockPopupWrapper = styled.div`
  width: 25rem;
  height: 15rem;
  background-color: ${({ theme }) => theme.colors.white};
  display: grid;
  border: 2px solid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 2rem 1fr;
  box-shadow: 1px 1px 0.3rem rgba(0, 0, 0, 0.5);
  overflow: hidden;

  .popup_label {
    background-color: ${({ theme }) => theme.colors.secondary_light};
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary_high};
    cursor: pointer;

    &:first-child {
      border-right: 1px solid ${({ theme }) => theme.colors.primary_high};
    }

    span {
      font-weight: 700;
      font-size: 0.8rem;
    }
  }

  .active {
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: unset;
  }

  .popup_container {
    padding: 0.8rem;
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input {
      width: 100%;
      min-height: 1.8rem;
      outline: none;
      border: 1.5px solid ${({ theme }) => theme.colors.primary_high};
      padding: 0 0.5rem;
    }
  }

  .popup_field-name {
    width: fit-content;
    font-size: 0.5rem;
    zoom: 0.9;
    padding: 0.2rem 0.8rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 2px;
    margin-bottom: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    button {
      width: 100%;
      margin-top: 0.5rem;
      font-size: 1rem;
    }
    .form_input {
      position: relative;

      input {
        padding: 0rem 2rem 0rem 0.5rem;
      }

      .checkIcon {
        width: 1.8rem;
        height: 100%;
        position: absolute;
        right: 0;
      }
    }

    .form_body {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 0.8rem;
      }
    }

    .newTab {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap: 0.5rem;
      height: 2rem;
      position: relative;

      label {
        width: fit-content;
        font-size: 0.8rem;
      }

      input[name='newTab'] {
        width: 1rem;
        height: 1rem;
        accent-color: ${({ theme }) => theme.colors.primary_high};
        user-select: none;
      }
    }
  }
`

export const ButtonBlockPopupListItemWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary_high};
  display: grid;
  grid-template-columns: 2.5rem 1fr 2.5rem;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }

  .popup_list-icon {
    justify-self: center;
    padding: 0.5rem;
    grid-column: 1 / 2;
  }

  .popup_list-text {
    grid-column: 2 / 3;
    p {
      &:first-child {
        font-weight: 700;
        font-size: 0.9rem;
        text-overflow: ellipsis;
        width: 90%;
        overflow: hidden;
        white-space: nowrap;
      }
      &:last-child {
        font-weight: 700;
        font-size: 0.5rem;
        zoom: 0.8;
      }
    }
  }

  .match {
    color: red;
  }

  .popup_list-link {
    grid-column: 3 / -1;
    justify-self: center;
  }
`
