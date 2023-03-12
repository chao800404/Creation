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
    box-shadow: 0 0 0.2rem ${({ theme: { colors } }) => colors.shadow};
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
  border: 2px solid ${({ theme }) => theme.colors.primary};
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 2rem 1fr;
  box-shadow: 1px 1px 0.3rem rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  overflow: hidden;

  .popup_label {
    background-color: ${({ theme }) => theme.colors.secondary_light};
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary_high};
    cursor: pointer;

    span {
      font-weight: 700;
      font-size: 0.8rem;
    }
  }

  .active-0,
  .active-1,
  .active-2 {
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: unset;
    color: ${({ theme }) => theme.colors.primary};
  }

  .active-0 {
    border-right: 1px solid ${({ theme }) => theme.colors.primary_high};
  }

  .active-1 {
    border-right: 1px solid ${({ theme }) => theme.colors.primary_high};
    border-left: 1px solid ${({ theme }) => theme.colors.primary_high};
  }

  .active-2 {
    border-left: 1px solid ${({ theme }) => theme.colors.primary_high};
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

    button {
      color: ${({ theme: { colors } }) => colors.primary};
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

type SelectItemWrapperProps = {
  active: boolean
}

export const SelectItemWrapper = styled('div').attrs<SelectItemWrapperProps>(
  ({ active }) => ({ active })
)<SelectItemWrapperProps>`
  width: 100%;
  margin-bottom: 0.4rem;
  border: 1px solid
    ${({ theme: { colors }, active }) =>
      active ? colors.primary_high_2 : colors.primary_high};

  background-color: ${({ theme: { colors }, active }) =>
    active ? colors.secondary : colors.white};

  color: ${({ theme: { colors }, active }) =>
    active ? colors.primary : colors.primary_2};

  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_light};
    color: ${({ theme }) => theme.colors.primary};
    border: ${({ theme }) => `1px solid ${theme.colors.primary_2}`};
  }
`

export const SelectIsEmpty = styled('div')`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary_high};
  margin: auto;
  flex-direction: column;
  gap: 0.5rem;

  span {
    font-size: 0.8rem;
  }
`

export const ExteranlLinkElem = styled('form')`
  display: flex;
  flex-direction: column;

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
    padding: 0.5rem 0;

    p {
      font-size: 0.8rem;
    }
  }

  button {
    width: 100%;
    padding: 0.5rem 0;
    font-size: 1rem;
    background-color: ${({ theme: { colors } }) => colors.primary_high};
    border-radius: 5px;
    font-weight: 700;
  }
`
