import { AlignBtn, VirticalBtn } from './controlItems'
import { ImageControllerProps } from './type'
import { CloudDownload } from '@styled-icons/boxicons-solid/CloudDownload'
import { Images } from '@styled-icons/bootstrap/Images'
import { DeleteLines } from '@styled-icons/fluentui-system-regular/DeleteLines'

export const ImageController = ({
  url,
  align,
  showPopup,
  vertical,
  handleAlign,
  handleDownload,
  handleVertical,
  handleDelete,
  handleShowPopup,
}: ImageControllerProps) => {
  return (
    <>
      <div
        className={`base_btn-img ${showPopup && 'active'}`}
        onClick={handleShowPopup}
      >
        <Images />
      </div>
      <span />
      {VirticalBtn.map(({ name, icon }) => (
        <div
          onClick={(e) => {
            e.preventDefault()
            handleVertical(name)
          }}
          key={name}
          className={`base_btn-img ${vertical === name && 'active'}`}
        >
          {icon}
        </div>
      ))}
      <span />
      {AlignBtn.map(({ name, icon }) => (
        <div
          onClick={(e) => {
            e.preventDefault()
            handleAlign(name)
          }}
          className={`base_btn-img ${align === name && 'active'}`}
          key={name}
        >
          {icon}
        </div>
      ))}

      <span />
      <div
        className="base_btn-img"
        onClick={(e) => {
          e.preventDefault()
          handleDownload()
        }}
      >
        <CloudDownload />
      </div>
      <div
        className="base_btn-img"
        onClick={(e) => {
          e.preventDefault()
          handleDelete()
        }}
      >
        <DeleteLines />
      </div>
    </>
  )
}
