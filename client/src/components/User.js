import React, { useCallback, useEffect } from 'react'
import path from '../ultils/contants'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { getCurrentUser } from '../store/actions'

const User = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { userData } = useSelector(state => state.user)
    console.log(userData);
    const goSystem = useCallback(() => {
        navigate(path.SYSTEM)
    }, [])
    useEffect(() => {
        setTimeout(() => {
            dispatch(getCurrentUser())
        }, 200);
    }, [])

    return (

        <div onClick={() => { goSystem() }} className='user-welcome flex flex-row items-center gap-2 cursor-pointer '>
            <div>

                <img src={userData?.avatar || 'https://phongtro123.com/images/default-user.png'}
                    className='object-cover h-10 w-10 rounded-full border-2 border-blue-500' />
            </div>
            <div className='flex flex-col'>
                <span className='text-sm'>Xin chao, <strong>{userData.name}</strong></span>
                <span className='text-xs'>Mã tài khoản: <strong>{userData.id}</strong></span>
                <span className='text-xs'>TK chính: <strong>{userData?.money || 0} VNĐ</strong></span>
            </div>

        </div>
    )
}

export default User