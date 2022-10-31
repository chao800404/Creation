/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePageStore } from '../../store'
import shallow from 'zustand/shallow'
import { DashboardBannerWrapper } from './banner.styles'
import ChangePopup from '../popup/changePopup'

const btnTap = {
  scale: 0.98,
  y: 1,
}

const DashboardBanner = ({ coverImage }: { coverImage: string }) => {
  const [start, setStart] = useState(false)
  const elemRef = useRef<HTMLDivElement>(null)
  const { layoutY, layoutYSet } = usePageStore(
    (state) => ({
      layoutY: state.layoutY,
      layoutYSet: state.layoutYSet,
    }),
    shallow
  )
  const [toggleRePos, setToggleRePos] = useState(false)
  const [togglePopup, setTogglePopup] = useState(false)
  const [originPosY, setOriginPosY] = useState<number>(0)

  const togglePopupMemorize = useCallback((toggle: boolean) => {
    setTogglePopup(toggle)
  }, [])

  const handlePointerUp = () => toggleRePos && setStart(false)

  useEffect(() => {
    if (elemRef.current && elemRef && start && toggleRePos) {
      const setCoverMove = (e: MouseEvent) => {
        const moveY = (originPosY - e.pageY) / 5 + layoutY
        if (moveY >= 100 || moveY <= 0) return
        layoutYSet(moveY)
      }
      document.addEventListener('pointermove', setCoverMove)
      document.addEventListener('pointerup', handlePointerUp)
      return () => {
        document.removeEventListener('pointermove', setCoverMove)
        document.removeEventListener('pointerup', handlePointerUp)
      }
    }
  }, [start, toggleRePos])

  useEffect(() => {
    const cancelPopup = (e: MouseEvent) => {
      const targetPopup = (e.target as HTMLDivElement).closest(
        '#dashboard-banner'
      )
      if (!targetPopup) setTogglePopup(false)
    }
    document.addEventListener('click', cancelPopup)
    return () => document.removeEventListener('click', cancelPopup)
  }, [])

  const handleOnPointerDown = (e: React.MouseEvent) => {
    if (toggleRePos) {
      e.preventDefault()
      setOriginPosY(e.pageY)
      setStart(true)
    }
  }

  return (
    <DashboardBannerWrapper
      id="dashboard-banner"
      onPointerDown={handleOnPointerDown}
      ref={elemRef}
    >
      {toggleRePos && (
        <div className="Dashboard_Banner-controller-cover">
          <div className="Dashboard_Banner-controller-cover-btn">
            Drag image to repostion
          </div>
        </div>
      )}
      <motion.div
        className="Dashboard_Banner-controller-btn"
        style={
          togglePopup || toggleRePos
            ? { opacity: 1, visibility: 'visible' }
            : {}
        }
      >
        <motion.div
          whileTap={btnTap}
          style={
            toggleRePos
              ? { opacity: 0, visibility: 'hidden' }
              : { opacity: 1, visibility: 'visible' }
          }
          className="Dashboard_Banner-controller-btn-change"
          onClick={() => togglePopupMemorize(!togglePopup)}
        >
          <p>{togglePopup ? 'cancel' : 'change cover'}</p>
        </motion.div>
        <motion.div
          whileTap={btnTap}
          className="Dashboard_Banner-controller-btn-reposition"
          onClick={() => {
            setToggleRePos((prev) => !prev)
            setTogglePopup(false)
          }}
        >
          <p>{toggleRePos ? 'save postion' : 'repostion'}</p>
        </motion.div>
        <motion.div className="Dashboard_Banner-controller-btn-popup">
          {togglePopup && <ChangePopup setToggleShow={togglePopupMemorize} />}
        </motion.div>
      </motion.div>
      <div
        className="Dashboard_Banner-controller-p"
        style={{ cursor: toggleRePos ? 'grab' : 'unset' }}
      />
      <Image
        src={coverImage || ''}
        layout="fill"
        alt="cover"
        objectFit="cover"
        objectPosition={`center ${layoutY}%`}
        priority={true}
      />
    </DashboardBannerWrapper>
  )
}

export default React.memo(DashboardBanner)
