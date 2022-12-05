import React, { useEffect, useMemo } from 'react'
import { DashboardFooterWrapper } from './footer.styles'
import { motion } from 'framer-motion'
import { BsArrowUpLeftSquare } from 'react-icons/bs'
import { useStatusStore } from '../../../src/store/useStatusStore'
import shallow from 'zustand/shallow'
import { STATUS_CONFIG } from '../../utils/config'
import ClipLoader from 'react-spinners/ClipLoader'

const DashboardFooter = () => {
  const { status, statusSet } = useStatusStore(
    (state) => ({ status: state.status, statusSet: state.statusSet }),
    shallow
  )

  const infoStatus = STATUS_CONFIG(status)

  useEffect(() => {
    if (status === 'success') {
      const timeout = setTimeout(() => statusSet('normal', ''), 3000)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <DashboardFooterWrapper>
      <div>fhefihei</div>
      <motion.div
        whileTap={{ scale: 0.98, y: 1 }}
        className="footer_info round_sm"
      >
        {status === 'pending' ? (
          <ClipLoader color={infoStatus.color} size={10} />
        ) : (
          <span
            className="footer_signal_light"
            style={{ backgroundColor: infoStatus.color }}
          />
        )}

        <span>{infoStatus.desc || 'error'}</span>
        <span>
          <BsArrowUpLeftSquare />
        </span>
      </motion.div>
    </DashboardFooterWrapper>
  )
}

export default DashboardFooter
