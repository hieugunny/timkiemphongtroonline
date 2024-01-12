import React, { useEffect, useState } from 'react'
import icons from '../ultils/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getDistrict, getProvince } from '../store/actions'
import Slider from 'rc-slider';
import { apiGetDistrict, apiGetProvince, apiGetWard } from '../apis/province';
import { TbDeviceIpadHorizontalQuestion } from 'react-icons/tb';
import { apiGetCategories } from '../apis/category';
const { GoArrowLeft } = icons
const Modal = ({ setIsShowModal, type, getData, setPayload }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState('')
  const [data, setData] = useState({})
  const [content, setContent] = useState([])
  const [obj, setObj] = useState({})
  useEffect(() => {
    setState(type)
  }, [])

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await apiGetCategories()
      if (response.data.err === 1)
        setContent(response.data.data)
    }
    const fetchProvince = async () => {
      const response = await apiGetProvince()
      if (response.data.err === 1)
        setContent(response.data.data)

    }
    const fetchDistrict = async () => {
      const response = await apiGetDistrict({ code: obj.code })
      if (response.data.err === 1)
        setContent(response.data.data.rows)

    }
    const fetchWard = async () => {
      const response = await apiGetWard({ code: obj.code })
      if (response.data.err === 1)
        setContent(response.data.data.rows)

    }
    if (state === 'close') {
      getData({ ...data, type: type })
      if (type !== 'category'){ 
        setPayload(prev => ({ ...prev, [type]: obj.name }))}
      setIsShowModal(false)
    }
    if (state === 'category') fetchCategory()
    if (state === 'province') fetchProvince()
    if (state === 'district') fetchDistrict()
    if (state === 'ward') fetchWard()

  }, [state])

  function handlerCheck(element) {
    // Khi user click vào thẻ li thì tùy vào trạng thái sẽ lưu giá trị data tương ứng
    // Ví dụ như trạng thái là district thì lẽ lưu district = dữ liệu mà người dùng click chọn
    // Sau đó chuyển sang vùng tiếp theo cùng với dữ liệu mà người dùng chọn. Ví dụ khi chọn xong province,
    // thì xet state thành vùng tiếp theo nhỏ hơn cấp province là district với tham số truyền vào là code của 
    // province mà user vừa chọn
    if (state === 'category') {
      setPayload(prev => ({ ...prev, category_code: element.code }))
      setData(element)
      setState('close')
    }
    else if (state == 'province') {
      setState('district')
      setObj(element)
      setData({ ...data, province: element.name })
      setPayload(prev => ({ ...prev, [state]: element.name.replace('Thành phố ', '')
      .replace('Tỉnh ', '') }))

    } else if (state == 'district') {
      setState('ward')
      setObj(element)
      setData({ ...data, district: element.name })
      setPayload(prev => ({ ...prev, [state]: element.name.replace('Thành phố ', '')
      .replace('Tỉnh ', '') }))

    } else if (state == 'ward') {
      setObj(element)
      setData({ ...data, ward: element.name })
      setPayload(prev => ({ ...prev, [state]: element.name.replace('Thành phố ', '')
      .replace('Tỉnh ', '') }))

      setState('close')
    }
  } // set state là close ở 2 trường hợp là bấm vào vùng ngoài modal và khi chọn xong ward
  // khi state là close thì sẽ tắt modal đi hay nói cách khác setisshowmodal false

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

        <ul className='pl-5 pr-2 py-2 text-sm'>
          <li onClick={() => { handlerCheck('all') }} className='border-t border-gray-200 px-1 py-2'>Tất cả</li>
          {content && content.length !== 0 && content.map(element => {
            return <li key={element.id} onClick={() => { handlerCheck(element) }} className='hover:text-[#007aff]  cursor-pointer border-t border-gray-200 px-1 py-2'>
              <input id={element.code} className='h-3 w-3 ' type='radio' />
              <label className='pl-1'>{element.name}</label>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Modal