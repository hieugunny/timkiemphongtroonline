import React, { useCallback, useState } from 'react'
import logo from '../assets/logo.png'
import { Button } from '.'
import { CiCirclePlus } from "react-icons/ci"
import icons from '../ultils/icons'
import menuMange from '../ultils/menuMange'
import { useNavigate, Link } from 'react-router-dom'
import path from '../ultils/contants'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
const { AiOutlinePlusCircle,
    GrAppsRounded,
    RiHeartLine, IoExitOutline
} = icons

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { userData } = useSelector(state => state.user)
    const [isShowMenu, setIsShowMenu] = useState(false)
    console.log(isShowMenu);
    console.log(userData);
    function handlerShowMenu() {
        setIsShowMenu(prev => !prev)
    }
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: flag })
    }, [])
    return (
        <div className='w-1100 flex items-center justify-between h-[70px]'
        >
            <Link to={'/'}>
                <img
                    src={logo}
                    alt='logo'
                    className='w-[240px] h-[70px] object-contain cursor-pointer'
                />
            </Link>

            <div className='flex items-center'>

                {isLoggedIn ?
                    <div className='flex items-center gap-6'>
                        <div className='user-welcome flex flex-row items-center gap-2 cursor-pointer '>
                            <div>
                                <img className='object-cover h-10 w-10 rounded-full' src='https://phongtro123.com/images/default-user.png' />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-sm'>Xin chao, <strong>{userData.name}</strong></span>
                                <span className='text-xs'>Mã tài khoản: <strong>{userData.id}</strong></span>
                                <span className='text-xs'>TK chính: <strong>{userData?.money || 0} VNĐ</strong></span>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-1 text-xs hover:underline cursor-pointer py-3'>
                            <RiHeartLine size={20} />
                            <span>Yêu thích</span>
                        </div>

                        <div className='relative'>
                            <div onClick={()=> handlerShowMenu()} className='px-1 flex flex-row items-center gap-1 text-xs hover:underline cursor-pointer py-3'>
                                <GrAppsRounded size={20} />
                                <span>Quản lý tài khoản</span>
                            </div>

                            {isShowMenu && <div className=' absolute bg-white  shadow-lg px-[20px] py-[15px] text-xs border border-gray-200 w-[200px]'>
                                <ul>
                                    {menuMange.map(el => {
                                        return (<li >
                                            <Link className='hover:text-orange-500  flex flex-row items-center py-2 border-b border-gray-200 gap-2 '
                                                key={el.id}
                                                to={el.path}>
                                                {el.icon}
                                                <span className='w-full '>{el.text}</span>
                                            </Link>
                                        </li>)
                                    })}
                                    <li    onClick={() => dispatch(actions.logout())} className='hover:text-orange-500 cursor-pointer flex flex-row items-center py-2 border-b border-gray-200 gap-2 '>
                                        <IoExitOutline />
                                        <span className='w-full'>Thoát</span>
                                    </li>
                                </ul>
                            </div>}
                        </div>
                        {/* <Button
                            text={'Đăng xuất'}
                            textColor={'text-white'}
                            bgColor={'bg-[#3961fb]'}
                            onClick={() => dispatch(actions.logout())} /> */}

                        <Button
                            text={'Đăng tin'}
                            textColor={'text-white'}
                            bgColor={'bg-red-400'} IcAfter={AiOutlinePlusCircle} />
                    </div>
                    :
                    <div className='flex items-center gap-1'>
                        <Button
                            text={'Đăng nhập'}
                            textColor={'text-white'}
                            bgColor={'bg-[#3961fb]'}
                            onClick={() => goLogin(false)} />
                        <Button
                            text={'Đăng ký'}
                            textColor={'text-white'}
                            bgColor={'bg-[#3961fb]'}
                            onClick={() => goLogin(true)} />
                        <Button
                            text={'Đăng tin'}
                            textColor={'text-white'}
                            bgColor={'bg-red-400'}
                            IcAfter={AiOutlinePlusCircle} />
                    </div>

                }
            </div>
        </div>
    )
}

export default Header