import React, { useEffect, useState } from 'react'
import { SearchItem, Modal } from '../components'
import icons from '../ultils/icons'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
import Slider from 'rc-slider';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom'
import path from '../ultils/contants'
const {
  LuMapPin,
  IoPricetagOutline,
  HiOutlineBuildingOffice2,
  BsTextareaResize, FiDelete, IoIosSearch } = icons
const Search = ( ) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { provinces, districts, wards, msg } = useSelector(state => state.province)
  const { categories, msg: categorieMsg } = useSelector(state => state.category)
  const { isSearch } = useSelector(state => state.app)
  const [isShowModal, setIsShowModal] = useState(false)
  const [typeModal, setTypeModal] = useState('')
  const [dataModal, setDataModal] = useState(null)
  const [addressData, setAddressData] = useState(null)
  const [categoryData, setCategoryData] = useState(categories[0])
  const [addressText, setAddressText] = useState('')
  const [categoryText, setCategoryText] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmit, setIsSubmit] = useState(false)
  useEffect(() => {
    dispatch(actions.getCategories())
  }, [])
  useEffect(() => {
    if (dataModal?.type === 'category') {
      setCategoryData(dataModal)
    } else if (dataModal?.type === 'province') {
      setAddressData(dataModal)
    }
  }, [dataModal])
  //set text 
  useEffect(() => {
  }, [isSubmit])
  // useEffect(() => { 
  //   if (categoryData) {
  //     setCategoryText(categoryData.name)
  //   }
  // }, [categoryData?.code, isSubmit])
  // xu li searchparam

  useEffect(() => {
    ;
    if (addressData) {
      const { type, ...data } = addressData
      setAddressText(Object.values(data)?.join(', '))
    }
  }, [addressData])
  useEffect(() => {
    if (categoryData) {
      setCategoryText(categoryData.name)
    }
  }, [categoryData?.code])
  function handleShowModel(type) {
    setIsShowModal(true)
    setTypeModal(type) // Xác định loại dữ liệu mà người dùng cần lọc : price, address, category, acreage
  }
  function handleSubmit() { 
    dispatch(actions.setSearch(!isSearch))
    let params = {}
    if (categoryData) params.category_code = categoryData.code
    if (addressData)
      Object.entries(addressData)?.forEach(element => {
        if (element[0] !== 'type')
          params[element[0]] = element[1]
            .replace('Thành phố ', '')
            .replace('Tỉnh ', '')
      }); 
    navigate({
      pathname: '',
      search: createSearchParams(params).toString(),
    }, {})
  }
  return (
    <>
      <div className='gap-1 items-center flex flex-row bg-[#febb02] justify-between h-[55px] rounded-md px-[8px] py-2'>
        <span onClick={() => handleShowModel('category')} className='py-2 flex-1'> <SearchItem icon={<HiOutlineBuildingOffice2 />} text={categoryText || categories[0]?.name} defaultText={''} /></span>
        <span onClick={() => handleShowModel('province')} className='py-2 flex-1'> <SearchItem icon={<LuMapPin />} text={addressText} defaultText={'Toàn quốc'} /></span>
        <span onClick={() => handleShowModel('price')} className='py-2 flex-1'> <SearchItem icon={<IoPricetagOutline />} defaultText={'Giá'} /></span>
        <span onClick={() => handleShowModel('acreage')} className='py-2 flex-1'> <SearchItem icon={<BsTextareaResize />} defaultText={'Diện tích'} /></span>
        <div onClick={() => handleSubmit()} className='cursor-pointer py-2 flex-1 font-bold flex justify-center items-center gap-1 bg-secondary1 text-white rounded-md   text-xs '>
          <IoIosSearch />
          <span>Tìm kiếm</span>
        </div>
      </div>
      {isShowModal && <Modal type={typeModal} getData={setDataModal} setIsShowModal={setIsShowModal} />}
    </>
  )
}

export default Search