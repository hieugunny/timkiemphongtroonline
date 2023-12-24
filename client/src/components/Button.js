import React, { memo } from 'react'
import icons from '../ultils/icons'

const { AiOutlinePlusCircle } = icons
const Button = ({ text, bgColor, textColor, IcAfter, onClick, fullWidth, custom }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`${custom} ${bgColor} ${textColor} ${fullWidth && 'w-full'}   rounded-md outline-none py-2 px-4 hover:underline justify-content gap-1`}
    >
      <span className='flex items-center flex-row gap-2'>{text} {IcAfter && <IcAfter />}</span> 
    </button>
  )
}

export default memo(Button)