/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, memo, useEffect } from 'react'

import { signIn } from 'next-auth/react'
import { usePopupStore, useUserStore } from '../../store'

import BasicInput from '../input/input'
import { HiOutlineMail } from 'react-icons/hi'
import { FaRegUser } from 'react-icons/fa'
import shallow from 'zustand/shallow'
import { LoginPopupWrapper } from './popup.styles'

const LoginPopup = () => {
  const { openPopup, toggle } = usePopupStore(
    (state) => ({
      openPopup: state.indexSignInDisplay,
      toggle: state.displayToggle,
    }),
    shallow
  )
  const {
    userClear,
    validity,
    showError,
    showErrorSet,
    user: { name, email },
  } = useUserStore(
    (state) => ({
      userClear: state.userClear,
      validity: state.validity,
      showError: state.showError,
      showErrorSet: state.showErrorSet,
      user: state.user,
    }),
    shallow
  )

  const [checkedItems, setCheckedItems] = React.useState(true)

  const elemRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as Element).closest('#login-form-box')
    const formParent = elemRef.current
    if (target === formParent || e.button === 2 || e.button === 1) return
    toggle()
  }

  const handleGoogleSingIn = async () => {
    const res = await signIn('google')
  }

  const handleMailSignIn = async () => {
    if (!checkedItems) return
    if (!(validity.email && validity.name)) {
      return showErrorSet(!validity)
    }
    await signIn('email', {
      name,
      email,
    })
  }

  useEffect(() => {
    userClear()
  }, [])

  return (
    <LoginPopupWrapper onMouseDown={handleMouseEnter}>
      <div className="loginPopup_container" ref={elemRef} id="login-form-box">
        <div className="loginPopup_close-icon" onClick={toggle}>
          {/* <CloseIcon color="gray.800" /> */}
        </div>
        <div className="loginPopup_logo center">
          <div>Logo</div>
        </div>
        <div className="center">
          <button onClick={handleGoogleSingIn}>google</button>
        </div>
        <div className="center">
          <span className="loginPopup_space">或</span>
        </div>
        <form className="loginPopup_form">
          <BasicInput
            type="email"
            placeholder="輸入電子郵件"
            validity={validity.email}
          >
            <HiOutlineMail color="#c3c3c3" size="1.2rem" />
          </BasicInput>

          <BasicInput
            type="username"
            placeholder="輸入您的姓名"
            validity={validity.name}
          >
            <FaRegUser color="#c3c3c3" size="1.2rem" />
          </BasicInput>

          <div className="loginPopup_checkbox">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCheckedItems(e.target.checked)
              }
              type="checkbox"
            />

            <p className="loginPopup_checkbox-desc">
              註冊帳號即表示您同意我們的
              <a href="#">服務條款</a>
              以及
              <a href="#">隱私政策</a>
            </p>
          </div>

          <div className="loginPopup_button_content">
            <button>註冊</button>
          </div>
          <div className="loginPopup_option">
            <p>已經註冊過了？ </p>
            <a href="#">登入</a>
          </div>
          <div className="loginPopup_line" />
          <div className="loginPopup_statement">
            <p>
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </div>
        </form>
      </div>
    </LoginPopupWrapper>
  )
}

export default memo(LoginPopup)
