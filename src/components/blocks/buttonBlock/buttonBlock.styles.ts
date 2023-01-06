import styled from 'styled-components'

type ButtonBlockPopupListItemType = {
  isActive: boolean
}

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
      &:nth-child(1) {
        width: fit-content;

        div {
          width: 2rem;
          margin-left: 0.3rem;
        }
      }

      &:nth-child(2) {
        padding: 0.5rem 0.8rem;
        min-width: 3rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      &:nth-child(3) {
        padding: 0.5rem;
        border-left: 1px solid ${({ theme }) => theme.colors.primary_high_2};
        background-color: ${({ theme }) => theme.colors.primary_dark};
      }
    }
  }

  .link-text {
    div {
      max-width: 15rem;
      min-width: 5rem;
      text-overflow: ellipsis;
      white-space: nowrap !important;
      overflow: hidden;
    }
  }

  .button_block-popup {
    position: absolute;
    z-index: 10;
    bottom: -15.5rem;
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

  .popup_label {
    background-color: ${({ theme }) => theme.colors.secondary_light};
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary_high};
    cursor: pointer;
    border-radius: inherit;

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

export const ButtonBlockPopupListItemWrapper = styled.div.attrs<ButtonBlockPopupListItemType>(
  ({ isActive }) => ({ isActive })
)<ButtonBlockPopupListItemType>`
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary_high};
  display: grid;
  grid-template-columns: 2.5rem 1fr 2.5rem;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  margin-bottom: 0.5rem;
  background-color: ${({ theme, isActive }) =>
    isActive && theme.colors.secondary};
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.primary : theme.colors.primary_high};

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
