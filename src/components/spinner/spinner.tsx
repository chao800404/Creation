import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'
import { SpinnerWrapper } from './spinner.styles'

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <PuffLoader color="#1c1c1c" />
    </SpinnerWrapper>
  )
}

export default Spinner
