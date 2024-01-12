import React, { useCallback, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Button, User } from '.'
import { CiCirclePlus } from "react-icons/ci"
import icons from '../ultils/icons'
import menuMange from '../ultils/menuManage'
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
    const { count } = useSelector(state => state.app)
    const { isLoggedIn, token, msg: authLog } = useSelector(state => state.auth)
    const { userData, msg: userLog } = useSelector(state => state.user)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [countFavouriteList, setCountFavouriteList] = useState(0)
    function handlerShowMenu() {
        setIsShowMenu(prev => !prev)
    }

    useEffect(() => { 
        let listPost = JSON.parse(localStorage.getItem("post_favourite") || '[]').length;
        setCountFavouriteList(count ===-1? listPost:count)
    }, [count])
    useEffect(() => { 
        dispatch(actions.getCurrentUser())
    }, [])

    const goSystem = useCallback(() => {
        navigate(path.SYSTEM)
    }, [])
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: flag })
    }, [])
    return (
        <div className='w-full flex items-center justify-between h-[70px]' >
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
                        <User userData={userData} />
                        <Link className='relative flex flex-row items-center gap-1 text-xs hover:underline cursor-pointer py-3'
                            to={path.FAVOURITE_POST}
                        >
                            <RiHeartLine size={20} className='' />
                            <span>Yêu thích</span>
                            {countFavouriteList !== 0 && <span className='top-[7px] right-[59px] absolute rounded-md bg-red-600 h-[16px] w-[16px] flex justify-center items-center text-white text-[10px] font-thin '>{countFavouriteList}</span>}
                        </Link>

                        <div className=''>
                            <div onClick={() => handlerShowMenu()} className='px-1 flex flex-row items-center gap-1 text-xs hover:underline cursor-pointer py-3'>
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
                                    <li onClick={() => dispatch(actions.logout({userId: userData?.id, token: token?.access_token}))} className='hover:text-orange-500 cursor-pointer flex flex-row items-center py-2 border-b border-gray-200 gap-2 '>
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