import React, { useEffect, useState } from 'react'
import { AddressForm, DescriptionForm, Loading, Map } from '../../components'
import icons from '../../ultils/icons'
import { apiCreatePost, apiUpdatePost, apiUploadImages } from '../../apis/post'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import joi from 'joi'
import { province, district, ward, title, description, price, roomArea, category_code } from '../../ultils/joi_schema'
import { getCurrentUser, getOnePost } from '../../store/actions'
import { Navigate, useNavigate } from 'react-router-dom'
import path from '../../ultils/contants'
const { IoCameraOutline } = icons
const CreatePost = ({ isEdit, isUpdate, setIsUpdate }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userData } = useSelector(state => state.user)
  const { onePost } = useSelector(state => state.post)
  const [isLoading, setIsLoading] = useState(false)
  const [invalidFields, setInvalidField] = useState([])
  const [showErrors, setShowErrors] = useState(false);
  const [payload, setPayload] = useState({
    contact: userData?.name,
    description: '',
    title: '',
    images: [],
    price: '',
    roomArea: '',
    province: '',
    district: '',
    ward: '',
    street: '',
    numberHouse: '',
    mobile: userData?.mobile,
  })
  const validate = (payload) => {
    const { error } = joi.object({ province, district, ward, title, description, price, roomArea, category_code }).options({ abortEarly: false, allowUnknown: true }).validate(payload)

    setInvalidField(error?.details?.map(item => {
      return {
        name: item.path[0],
        message: item.message
      }
    }))
  }
  useEffect(() => {
    if (isEdit) {
      const { images, ...data } = onePost
      setPayload({ ...data, images: JSON.parse(images) })
    }
  }, [])

  useEffect(() => {
    const fetchUpdatePost = async () => {
      setIsUpdate(false)
      setIsLoading(true)
      console.log(payload);
      const response = await apiUpdatePost({ ...payload, province: payload.province.replace('Thành phố ', '').replace('Tỉnh ', '') })
      setIsLoading(false)
      if (response.data.err === 1 && response.status === 200) {
        dispatch(getCurrentUser())
        window.location.reload(); 
        Swal.fire('Success', 'Update thành công!')
      }
      else {
        Swal.fire('Opps', 'Chỉnh sửa thất bại!', 'error')
      }
    }

    if (isUpdate) {
      fetchUpdatePost()
    }
  }, [isUpdate])

  const handleFile = async (e) => {
    setIsLoading(true)
    e.stopPropagation()
    const files = e.target.files
    let images = []
    for (let i of files) {
      let file = new FormData()
      file.append('file', i)
      file.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
      const response = await apiUploadImages(file)
      images = [...images, response.data.url]
    }
    let imageslist = [...payload.images, images]
    setPayload((prev) => ({ ...prev, images: [...images, ...prev.images] }))
    setIsLoading(false)
  }

  const deleteAnImage = (e, idx) => {
    if (payload.images?.length !== 0) {
      delete payload.images[idx]
      setPayload((prev) => ({ ...prev, images: [...payload.images.filter(el => el)] }))
    }
  }
  useEffect(() => {
    validate()
  }, [payload])

  const submitCreatePost = async () => {
    setIsLoading(true)
    const response = await apiCreatePost({ ...payload, province: payload.province.replace('Thành phố ', '').replace('Tỉnh ', '') })
    setIsLoading(false)
    if (response.data.err === 1 && response.status === 200) {
      dispatch(getCurrentUser())
      Swal.fire('Success', 'Tạo bài thành công')
      navigate(`${path.SYSTEM2}${path.MANAGE_POST}`)
    }
    // else if(validate()?.length === 0 || !validate()){
    //   Swal.fire('Opps', 'Some thing not true!', 'error')
    // }
    else {
      Swal.fire('Opps', 'Tạo post thất bại!', 'error')
    }
  }
  return (
    <div className='pb-[60px]'> {isLoading && <Loading />}
      <h1 className='text-[35px] mt-[5px] border-b border-gray-300 pb-[4px] font-bold'>{isEdit ? 'Chỉnh sửa tin' : 'Đăng tin mới'}</h1>
      <div className='w-full flex flex-row'>
        <div className='w-full px-[20px]'>

          <AddressForm isEdit={isEdit} value={payload} setValue={setPayload} invalidFields={invalidFields} />
          <DescriptionForm isEdit={isEdit} setValue={setPayload} invalidFields={invalidFields} />

          {/* Đăng ảnh */}
          <div className='mb-[40px] '>
            <h1 className='text-[25px] font-bold gap-2 py-2'>Hình ảnh</h1>
            <div className='w-full h-[200px]   border-dashed border-2 flex flex-col justify-center items-center'>
              <label htmlFor='files' className='cursor-pointer'>
                <i><IoCameraOutline size={100} /></i>
                <span>Thêm ảnh</span>
              </label>
              <input onChange={(e) => { handleFile(e) }} multiple hidden id='files' type='file' />
            </div>

          </div>
          <div>
            <div className='flex flex-wrap gap-1'>
              {payload?.images?.map((el, idx) => {
                return (
                  <div className='flex flex-col shadow-md border border-gray-400'>
                    <img src={el} alt='preview' className='w-[140px] h-[120px] object-cover' />
                    <button onClick={(e) => deleteAnImage(e, idx)} className='w-full border-none py-[2px] bg-gray-200' value={idx}>
                      Xóa
                    </button>
                  </div>
                )
              })}
            </div>

            {isEdit && <div className='w-full py-[200px]'></div>}
          </div>

          {!isEdit && <div onClick={() => { submitCreatePost() }} className=' cursor-pointer w-full bg-green-500 text-white justify-center flex'>Tiếp tục</div>}
        </div>

        <div className='w-[30%]  mb-[50px] '> 
        </div>
      </div>
    </div >
  )
}

export default CreatePost