import styled from 'styled-components'
import { motion } from 'framer-motion'

export const SearchPopupWrapper = styled('div')`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  justify-content: center;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  font-weight: 700;

  .search_popup {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    position: absolute;
    top: 10rem;
    width: 30rem;
    min-height: 10rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 0 1rem;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    box-shadow: 0.2rem 0.2rem 0.8rem rgba(0, 0, 0, 0.5);

    &--content {
      width: 100%;
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
      border-top-right-radius: 0.5rem;
      border-top-left-radius: 0.5rem;
      margin-top: 1rem;
      font-weight: inherit;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.primary};
        bottom: -6px;
        width: 50%;
      }
    }

    &--input {
      width: 100%;
      font-weight: inherit;
      margin-bottom: 0.2rem;
    }

    &--icon {
      width: 2.5rem;
      height: 100%;

      svg {
        margin: auto;
      }
    }
  }
`

export const WorkspaceItemPopupWrapper = styled(motion.div)`
  position: absolute;
  width: auto;
  height: auto;
  border-radius: 0.3rem;
  background: #f4f4f4;
  box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  z-index: 10001;
  padding: 0.3rem 0.5rem;
`

export const UserPopupWrapper = styled(motion.div)`
  padding: 0.2rem;
  cursor: pointer;
  position: relative;

  .userpopup_container {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    &-image {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 5px;
      overflow: hidden;
    }

    &-name {
      font-size: 0.9rem;
      font-weight: bold;
    }

    &-icon {
      width: fit-content;
      svg {
        margin: auto;
      }
    }
  }

  .userpopup_main {
    position: absolute;
    bottom: fit-content;
    transform: translateY(1.2rem);
    right: -0.8rem;
    width: 15rem;
    height: fit-content;
    border-radius: 0.4rem;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    background-color: #ffffff;
    box-shadow: 0rem 0rem 0.4rem rgba(0, 0, 0, 0.2);
    z-index: 1000;

    &:after {
      content: '';
      width: 1rem;
      height: 1rem;
      background-color: #ffffff;
      transform: translateX(-50%) rotate(45deg);
      position: absolute;
      left: 50%;
      z-index: 3000;
      top: -0.6rem;
      border-top: 2px solid ${({ theme }) => theme.colors.primary};
      border-left: 2px solid ${({ theme }) => theme.colors.primary};
    }

    &-header,
    &-item {
      display: flex;
      justify-content: start;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-right: 2rem;
      padding-left: 0.5rem;
      border-bottom: 1px solid;
      gap: 1rem;

      font-size: 0.5rem;
      font-weight: 700;

      align-items: center;
    }

    &-header {
      &-image {
        width: 1rem;
        height: 1rem;
        border-radius: 5px;
        overflow: hidden;
      }

      p {
        font-size: 0.7rem;
      }
    }
  }
`

export const ChangePopupWrapper = styled(motion.div)`
  width: 16.5rem;
  height: 20rem;
  border-radius: 5px;

  box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};

  font-weight: bold;

  .change_popup-tabs {
    width: 100%;
    display: flex;
    height: 2rem;
    border-bottom: 2px solid;
    justify-content: space-between;

    &-list {
      display: flex;
      width: 100%;
      position: relative;

      &-item {
        height: 100%;
        width: 3.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }

      &-slide {
        position: absolute;
        width: 3.2rem;
        height: 0.2rem;
        z-index: 300;
        bottom: 0rem;
        padding: 0 0.5rem;

        span {
          width: 100%;
          display: block;
          height: 100%;
          background: ${({ theme }) => theme.colors.primary};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      }
    }

    &-delete {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #ffffff;
      border-right: unset;
      border-bottom: unset;
      width: 5rem;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: #ffffff;
      }
    }
  }

  .change_popup-content {
    width: 100%;
    height: calc(100% - 2rem);
  }

  .change_popup-padding {
    padding: 0.5rem 0.5rem;
  }
`

export const LoginPopupWrapper = styled('div')`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(0.3rem) hue-rotate(90deg);
  background: rgba(0, 0, 0, 0.7);

  a {
    color: red;
  }

  .loginPopup_container {
    padding: 20px 3rem;
    width: 30rem;
    height: 40rem;
    margin-top: 0.3rem;
    background-color: white;
    border-radius: 0.3rem;
    box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.3);
    z-index: 300;
    position: relative;
  }

  .loginPopup_close-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.3rem 0.5rem;
    border-top-right-radius: 0.2rem;
    cursor: pointer;

    &:hover {
      background-color: #c3c3c3;
    }
  }

  .center {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .loginPopup_logo {
    padding: 2rem 0;
  }
  .loginPopup_space {
    padding: 0.5rem;
  }

  .loginPopup_button-google {
  }

  .loginPopup_form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .loginPopup_checkbox {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;

    input[type='checkbox'] {
      width: 1.2rem;
      height: 1.2rem;
      accent-color: #c3c3c3;
    }

    &-desc {
      font-size: 0.8rem;
      margin-left: 0.5rem;
    }
  }

  .loginPopup_button_content {
    margin-top: 0.5rem;
    button {
      width: 100%;
      height: 3rem;
      border-radius: 5px;
      color: #ffffff;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  .loginPopup_option {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .loginPopup_line {
    height: 1rem;
    border-bottom: 1px solid #3c3c3c;
  }

  .loginPopup_statement {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;

    p {
      width: 80%;
      text-align: center;
      font-size: 0.8rem;
    }
  }
`

export const BlockPopupWrapper = styled('div')`
  width: auto;
  display: flex;
  color: #5c5c5c;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  padding: 0.5rem 0;
  border-radius: 5px;
  position: relative;

  button.is-active {
    color: #ffffff;
  }

  .blockPopup-btn {
    color: inherit;
    width: auto;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 0 0.5rem;
    cursor: pointer;

    &:not(:last-child) {
      border-right: 1px solid #5c5c5c;
    }

    &-icon {
      color: inherit;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      color: #ffffff;
    }
  }

  & > .bubble {
    position: absolute;
  }
`

export const SecondBubbleWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.7rem;
  width: 16.5rem;
  background-color: ${({ theme }) => theme.colors.white};

  .color-picker {
    width: 100%;
    height: 10rem;
    cursor: pointer;
  }

  & > input {
    height: 2rem;
    margin: 0.5rem;
    font-size: 0.8rem;

    &:focus {
      outline: none;
    }
  }

  & > button {
    width: 4.5rem;
    height: 2rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`

export const MenuPopupWrapper = styled.div`
  position: absolute;
  width: 9.5rem;
  height: auto;
  border-radius: 0.3rem;
  background: #f4f4f4;
  box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  z-index: 10001;
  padding: 1px;
`
