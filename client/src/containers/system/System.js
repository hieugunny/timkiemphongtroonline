import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { HeaderSystem, SideBarSystem } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import path from '../../ultils/contants'
import Swal from 'sweetalert2'
import { getCurrentUser } from '../../store/actions'

const System = () => {
  const {isLoggedIn} = useSelector(state => state.auth)
  const {userData} = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(getCurrentUser())
    }, 500);
    console.log(userData);
  }, []) 
  if(!isLoggedIn) {
    Swal.fire('Oops','Phiên bản hết hạn, vui lòng đăng nhập lại','error')
    return <Navigate replace={true} to={`/${path.LOGIN}`}/> 
  }
  return (
    <div className='w-full  h-full  '>
      
      <div className='fixed w-full'> <HeaderSystem /></div>
      <div className='w-full  min-h-[2000px] flex flex-row  '>
        <div className='w-[15%]  h-screen border-r border-gray-200 px-[20px] mt-[50px] fixed'>
          <SideBarSystem/> 
        </div>
        <div className='w-[15%]  h-screen border-r border-gray-200 px-[20px] '> 
        </div>
        <div className='w-[85%] px-[42px] py-[20px] overflow-y-scroll mt-[50px]'> 
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default System