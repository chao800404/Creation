/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Suspense,
} from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCoverStore } from '../../store'
import shallow from 'zustand/shallow'
import { DashboardBannerWrapper } from './banner.styles'
import SelectImageContainer from '../container/selectImageContainer'
import UploadImagContainer from '../container/uploadImageContainer'
import useOnClickOutside from '../../utils/useOnClickOutside'
import dynamic from 'next/dynamic'

const DynamicChangePopup = dynamic(() => import('../popup/changePopup'), {
  suspense: true,
})

const btnTap = {
  scale: 0.98,
  y: 1,
}

const DashboardBanner = ({ coverImage }: { coverImage: string }) => {
  const [start, setStart] = useState(false)
  const elemRef = useRef<HTMLDivElement>(null)
  const { layoutY, layoutYSet } = useCoverStore(
    (state) => ({
      layoutY: state.layoutY,
      layoutYSet: state.layoutYSet,
    }),
    shallow
  )
  const coverImageMap = useCoverStore((state) => state.coverImageMap, shallow)
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

  useOnClickOutside((e) => {
    const targetPopup = (e.target as HTMLDivElement).closest(
      '#dashboard-banner'
    )
    if (!targetPopup) setTogglePopup(false)
  })

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
        <AnimatePresence>
          {togglePopup && (
            <motion.div className="Dashboard_Banner-controller-btn-popup">
              <Suspense fallback={``}>
                <DynamicChangePopup tabs={['cover', 'upload', 'link']}>
                  <div className="change_popup-padding">
                    {coverImageMap &&
                      Object.entries(coverImageMap).map((cover, index) => (
                        <SelectImageContainer
                          key={index}
                          groupName={cover[0]}
                          coverGroup={cover[1]}
                          setToggleShow={togglePopupMemorize}
                        />
                      ))}
                  </div>
                  <UploadImagContainer setToggleShow={togglePopupMemorize} />
                </DynamicChangePopup>
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
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
        priority
      />
    </DashboardBannerWrapper>
  )
}

export default React.memo(DashboardBanner)
