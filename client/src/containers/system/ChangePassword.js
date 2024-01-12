import React, { useEffect, useState } from 'react'
import { InputFormV3, Loading } from '../../components'
import Swal from 'sweetalert2'
import { apiChangePassword } from '../../apis/user'
import { redirect } from 'react-router-dom'
import path from '../../ultils/contants'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/actions'
const ChangePassword = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { userData } = useSelector(state => state.user)
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async () => {
        if (payload.newPassword !== payload.newPassword2) {
            Swal.fire('Error', 'Mật khẩu mới không khớp nhau!', 'error')
        } else {
            const response = await apiChangePassword({ ...payload, token: token }) 
            console.log(response);
            if (response.data.err === 1) {
                Swal.fire('Success', response.data.msg, 'success')
                dispatch(logout())
            } else {
                Swal.fire('Oops', response.data.msg, 'error')
            }
        }
    }
    const [payload, setPayload] = useState({})
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    return (
        <div className='pb-[60px]'> {isLoading && <Loading />}
            <h1 className='text-[35px] mt-[5px] border-b border-gray-300 pb-[4px]'>Đổi mật khẩu</h1>
            <div className='w-full flex flex-row justify-center'>
                <div className='w-full px-[200px] py-[50px] gap'>
                    <InputFormV3 setValue={setPayload} name={'oldPassword'} text={'Mật khẩu cũ'} type={'password'} isReadOnly={false} />
                    <InputFormV3 setValue={setPayload} name={'newPassword'} text={'Mật khẩu mới'} type={'password'} isReadOnly={false} />
                    <InputFormV3 setValue={setPayload} name={'newPassword2'} text={'Nhập lại mật khẩu mới'} value={''} type={'password'} isReadOnly={false} />
                    <button onClick={() => handleSubmit()} className='w-full bg-secondary1 mt-5 text-white rounded-md py-1 hover:bg-blue-800'>Lưu & cập nhật </button>
                </div>
            </div>


        </div>
    )
}

export default ChangePassword