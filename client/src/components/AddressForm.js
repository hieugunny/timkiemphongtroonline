import React, { useEffect, useState } from 'react'
import Select from './Select'
import { apiGetDistrict, apiGetProvince, apiGetWard } from '../apis/province'
import { InputFormV2, InputReadOnly } from '../components'
import { BsXCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const AddressForm = ({ setValue, value, invalidFields, isEdit }) => {
  const { onePost } = useSelector(state => state.post)
  const [provinces, setProvinces] = useState([])
  const [province, setProvince] = useState(null)
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState(null)
  const [wards, setWards] = useState([])
  const [ward, setWard] = useState(null)
  const [numberHouse, setNumberHouse] = useState(null)
  const [street, setStreet] = useState(null)
  const [address, setAddress] = useState({})
  const [addressText, setAddressText] = useState(null)
  // lấy tất cả  tỉnh/ thành phố
  useEffect(() => {
    const fetchProvince = async () => {
      const response = await apiGetProvince()
      if (response?.data?.err === 1) setProvinces(response.data.data)
    }

    fetchProvince()
    if (isEdit) {
      const result = provinces.find(item => item.name.replace('Tỉnh ', '') === onePost.province)
      if (result) setProvince(result)
    }
  }, [])

  // lấy quận/huyện với code của thành phố đã chọn
  useEffect(() => {
    const fetchDistrict = async (code) => {
      const response = await apiGetDistrict(code)
      if (response?.data?.err === 1) setDistricts(response.data.data.rows)
    }
    if (province) fetchDistrict({ code: province.code })
    if (province && isEdit) {
      const result = districts.find(item => item.name === onePost.district)
      if (result) setDistrict(result)
    }
  }, [province])
  // lấy phường/xã với code của quận đã chọn
  useEffect(() => {
    const fetchWard = async (code) => {
      const response = await apiGetWard(code)
      if (response?.data?.err === 1) setWards(response.data.data.rows)
    }
    if (district) fetchWard({ code: district.code })
    if (district && isEdit) {

      const result = wards.find(item => item.name === onePost.ward)
      if (result) setWard(result)
    }
  }, [district])

  useEffect(() => {
    if (district) setDistrict(null)
    if (ward) setWard(null)
    if (districts.length !== 0) setDistricts([])
    if (wards.length !== 0) setWards([])
  }, [province])


  useEffect(() => {
    const numberHouseText = value?.numberHouse ? value?.numberHouse + ' ' : ''
    const streetText = value?.street ? `Đường ${value?.street}` + ',' : ''
    const wardText = ward ? ward.value + ',' : ''
    const districtText = district ? district.value + ',' : ''
    const provinceText = province ? province.value : '' 
    setAddressText(`${numberHouseText} ${streetText} ${wardText} ${districtText} ${provinceText}`)

  }, [province, district, ward, value?.numberHouse, value?.street])


  useEffect(() => {
    if(isEdit)
    {
      setProvince(onePost?.province)
      setWard(onePost?.ward)
      setDistrict(onePost?.district)
      setNumberHouse(onePost?.numberHouse)
    }

  }, [])




  return (
    <div className='mb-[40px]       '>
      <h1 className='text-[25px] font-bold gap-2 py-2'>Địa chỉ cho thuê</h1>
      <div className='flex flex-wrap mb-3 gap-2'>
        <Select isEdit={isEdit} text={'Tỉnh/Thành phố'} invalidFields={invalidFields} options={provinces} setValue={setValue} setCode={setProvince} name={'province'} />
        <Select isEdit={isEdit} text={'Quận/Huyện'} options={districts} setValue={setValue} setCode={setDistrict} name={'district'} />
        <Select isEdit={isEdit} text={'Phường/Xã'} options={wards} setValue={setValue} setCode={setWard} name={'ward'} />
        <InputFormV2 isEdit={isEdit} text={'Đường/Phố'} setValue={setValue} width={'w-[30%]'} name={'street'} />
        <InputFormV2 isEdit={isEdit} text={'Số nhà'} setValue={setValue} width={'w-[30%]'} name={'numberHouse'} />
      </div>
      <InputReadOnly value={addressText} text={'Địa chỉ chính xác'} width={'w-full'} />
    </div>
  )
}

export default AddressForm