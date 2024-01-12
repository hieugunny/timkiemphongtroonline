import React, { useState } from 'react'
import Select from './Select'
import { useSelector } from 'react-redux'
import InputReadOnly from './InputReadOnly'
import InputFormV2 from './InputFormV2'

const DescriptionForm = ({setValue,invalidFields, isEdit}) => {
 
  const { categories } = useSelector(state => state.category)
  const { userData } = useSelector(state => state.user)
  const [category, setCategory] = useState(null)
  const [objectRental, setObjectRental] = useState(null)
  const objectRentalData = [
    { name: 'Tất cả', code: 'all' },
    { name: 'Nữ', code: 'female' },
    { name: 'Nam', code: 'male' },

  ]
 
  
  return (
    <div className='mb-[40px]       '>
      <h1 className='text-[25px] font-bold gap-2 py-2'>Thông tin mô tả</h1>
      <div className='flex flex-wrap mb-3 gap-2'>
        <Select isEdit={true} text={'Loại chuyên mục'} setValue={setValue} setCode={setCategory} options={categories} name={'category_code'} isSelectFirst={!isEdit}/>
        <InputFormV2 isEdit={isEdit} invalidFields={invalidFields} name={'title'} text={'Tiêu đề'} setValue={setValue} width={'w-full'} type={'text'}/>
        <InputFormV2 isEdit={isEdit} invalidFields={invalidFields} name={'description'} text={'Nội dung mô tả'} setValue={setValue} width={'w-full'}  />
        <InputReadOnly text={'Thông tin liên hệ'} value={userData.name} width={'w-[40%]'} />
        <InputReadOnly text={'Số điện thoại'} value={userData?.mobile} width={'w-[40%]'} />
        <InputFormV2 isEdit={isEdit} invalidFields={invalidFields} name={'price'} text={'Giá thuê'} setValue={setValue} width={'w-[70%]'} tag={'VNĐ/Tháng'} type={'number'} />
        <InputFormV2 isEdit={isEdit} invalidFields={invalidFields} name={'roomArea'} text={'Diện tích'} setValue={setValue} width={'w-[70%]'} tag={'m²'} type={'number'} />
        <Select isEdit={true} text={'Đối tượng cho thuê'} setValue={setValue} setCode={setObjectRental} options={objectRentalData} name={'rentObject'} isSelectFirst={!isEdit}/>
      </div>
    </div>
  )
}

export default DescriptionForm