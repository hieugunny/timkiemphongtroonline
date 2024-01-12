import React, { useEffect, useState } from 'react'
import icons from '../ultils/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getDistrict, getProvince } from '../store/actions'
import Slider from 'rc-slider';
import { apiGetDistrict, apiGetProvince, apiGetWard } from '../apis/province';
import { TbDeviceIpadHorizontalQuestion } from 'react-icons/tb';
import { apiGetCategories } from '../apis/category';
const { GoArrowLeft } = icons
const PostListModal = ({ setIsShowModal, type, getData, setPayload }) => {
  const [state, setState] = useState('')
  const dispatch = useDispatch() 

  return (
    <div
      onClick={(e) => {
        if (e.target.className.includes('none-modal')) setState('close')
      }}
      className='none-modal fixed top-0 left-0 bottom-0 right-0 flex justify-center z-10 items-center bg-overlay-70'>
      <div className='bg-white w-[700px] rounded-md p-1 h-[500px] overflow-auto'>
        <header className='flex flex-row items-center justify-between h-[45px] border-b border-gray-100'>
          <GoArrowLeft size={24} onClick={(e) => { e.stopPropagation(); setIsShowModal(false) }} />
          <span className='uppercase font-bold color-[#333333] text-sm'>Chọn loại bất động sản</span>
          <span></span>
        </header> 
      </div>
    </div>
  )
}

export default PostListModal