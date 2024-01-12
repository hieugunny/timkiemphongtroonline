import React, { useEffect, useState } from 'react'
import { InputFormV2, InputFormV3, InputReadOnly, Loading } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { apiUploadImages } from '../../apis/post'
import { apiUpdateUser } from '../../apis/user'
import Swal from 'sweetalert2'
import { getCurrentUser } from '../../store/actions'

const UpdateUser = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [payload, setPayload] = useState({
    name: userData?.name,
    zalo: userData?.zalo,
    avatar: userData?.avatar,
  }) 
  const { isLoggedIn } = useSelector(state => state.auth)
  useEffect(() => {
    if (isUpdate) {
      setTimeout(() => {
        isLoggedIn && dispatch(getCurrentUser())
      }, 500);
      setIsUpdate(false)
    }
  }, [isUpdate])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });  
  }, [])
  
  const handleSubmit = async () => {
    console.log(payload);
    setIsLoading(true) 
    const response = await apiUpdateUser(payload)
    if (response.data.err === 1) {
      Swal.fire('Success', response.data.msg, 'success')
      setIsUpdate(true)
    }
    else
      Swal.fire('Opps', response?.data?.msg, 'error')
    console.log(payload);
    setIsLoading(false)

  }
  const handleFile = async (e) => {
    setIsLoading(true)
    e.stopPropagation()
    const files = e.target.files
    if (files.length === 0) {
      setIsLoading(false)
      return
    }
    let images = [payload.avatar]
    let file = new FormData()
    file.append('file', files[0])
    file.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
    const response = await apiUploadImages(file)
    images = response.data.url
    setPayload((prev) => ({ ...prev, avatar: images }))
    setIsLoading(false)
  }
  return (
    <div className='pb-[60px]'> {isLoading && <Loading />}
      <h1 className='text-[35px] mt-[5px] border-b border-gray-300 pb-[4px]'>Cập nhật thông tin cá nhân</h1>
      <div className='w-full flex flex-row'>
        <div className='w-full px-[200px] py-[50px] gap'>
          <InputFormV3 setValue={setPayload} text={'Mã thành viên'} value={'#' + userData.id} isReadOnly={true} />
          <InputFormV3 setValue={setPayload} text={'Số điện thoại'} value={userData.mobile} isReadOnly={true} />
          <InputFormV3 setValue={setPayload} text={'Tên hiển thị'} value={userData.name} name={'name'} />
          <InputFormV3 setValue={setPayload} text={'Zalo'} value={userData.zalo} name={'zalo'} />
          <InputFormV3 setValue={setPayload} text={'Mật khẩu'} />

          <div className='flex flex-row py-3 gap-4'>
            <label className='font-bold w-[20%]'>Ảnh đại diện</label>
            <div className='flex flex-col justify gap-2'>
              <img src={payload?.avatar || userData?.avatar || 'https://phongtro123.com/images/default-user.png'}
                className='rounded-full w-[140px] h-[140px]' />
              <label htmlFor='file' className='hover:opacity-70 cursor-pointer border border-gray-300 rounded-md p-1 flex justify-center '>Chọn ảnh</label>
              <input onChange={(e) => { handleFile(e) }} hidden id='file' type='file' />

            </div>
          </div>


          <button onClick={() => handleSubmit()} className='w-full bg-secondary1 mt-5 text-white rounded-md py-1 hover:bg-blue-800'>Lưu & cập nhật </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser