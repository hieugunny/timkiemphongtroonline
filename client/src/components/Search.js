import React, { useEffect, useState } from 'react'
import { SearchItem, Modal, ModalV2 } from '../components'
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
  BsTextareaResize, IoIosSearch } = icons
const Search = () => {
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
  const [price, setPrice] = useState()
  const [priceText, setPriceText] = useState(null)
  const [roomAreaText, setRoomAreaText] = useState(null)
  const [roomArea, setRoomArea] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmit, setIsSubmit] = useState(false)
  const [payload, setPayload] = useState({})
  useEffect(() => {
    dispatch(actions.getCategories())
  }, [])
  useEffect(() => {
    if (dataModal?.type === 'category') {
      setCategoryData(dataModal)
    } else if (dataModal?.type === 'province') {
      setAddressData(dataModal)
    } else if (dataModal?.type === 'price') {
      {
        setAddressData(dataModal)
        console.log('type price');
      }
    } else if (dataModal?.type === 'roomArea') {
      setAddressData(dataModal)
    }
  }, [dataModal])
  //set text 
  useEffect(() => {
    if (payload?.price) {
      setPriceText(`${payload.price[0] > 1000000 ? payload.price[0] / 1000000 : payload.price[0]} - ${payload.price[1] > 1000000 ? payload.price[1] / 1000000 : payload.price[1]} triệu`)
    }
    if (payload?.roomArea) {
      setRoomAreaText(`${payload.roomArea[0]} - ${payload.roomArea[1]} m2`)
    }
  }, [payload])

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
    setTypeModal(type) // Xác định loại dữ liệu mà người dùng cần lọc : price, address, category, roomArea
  }
  function handleSubmit() {
    let params = {} 
    Object.keys(payload).forEach(element => {
      if(!payload[element])
      {
        delete payload[element]
        setPayload(payload)
      }
    });
    params=payload
    console.log(params);
    if(payload?.price) {
      params = {...params,priceFrom:payload.price[0],priceTo:payload.price[1]}
      delete params.price
    }
    if(payload?.roomArea){
      params = {...params,roomAreaFrom:payload.roomArea[0],roomAreaTo:payload.roomArea[1]}
      delete params.roomArea
    }
    navigate({
      pathname: '',
      search: createSearchParams(params).toString(),
    }, {})
  }
  return (
    <>
      <div className=' gap-1 items-center flex flex-row bg-[#febb02] justify-between h-[55px] rounded-md px-[8px] py-2'>
        <span onClick={() => handleShowModel('category')} className='cursor-pointer py-2 flex-1'> <SearchItem icon={<HiOutlineBuildingOffice2 />} text={categoryText || categories[0]?.name} defaultText={''} /></span>
        <span onClick={() => handleShowModel('province')} className='cursor-pointer py-2 flex-1'> <SearchItem icon={<LuMapPin />} text={addressText} defaultText={'Toàn quốc'} /></span>
        <span onClick={() => handleShowModel('price')} className='cursor-pointer py-2 flex-1'> <SearchItem icon={<IoPricetagOutline />} text={priceText} defaultText={'Giá'} /></span>
        <span onClick={() => handleShowModel('roomArea')} className='cursor-pointer py-2 flex-1'> <SearchItem icon={<BsTextareaResize />} text={roomAreaText} defaultText={'Diện tích'} /></span>
        <div onClick={() => handleSubmit()} className='cursor-pointer py-2 flex-1 font-bold flex justify-center items-center gap-1 bg-secondary1 text-white rounded-md   text-xs '>
          <IoIosSearch />
          <span>Tìm kiếm</span>
        </div>
      </div>
      {((typeModal === 'province' || typeModal === 'category') && isShowModal) && <Modal type={typeModal} getData={setDataModal} setPayload={setPayload} setIsShowModal={setIsShowModal} />}
      {((typeModal === 'price' || typeModal === 'roomArea') && isShowModal) && <ModalV2 type={typeModal} getData={setDataModal} setPayload={setPayload} setIsShowModal={setIsShowModal} />}
    </>
  )
}

export default Search