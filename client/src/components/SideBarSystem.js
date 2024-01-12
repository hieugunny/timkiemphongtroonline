import React, { useEffect } from 'react'
import { User } from '../components/'
import { useDispatch, useSelector } from 'react-redux'
import menuSideBarAdmin from '../ultils/menuSideBarAdmin'
import menuSideBar from '../ultils/menuSideBar'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import * as actions from '../store/actions'
const { IoExitOutline } = icons
const SideBarSystem = () => {

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const { token } = useSelector(state => state.auth) 
    return (
        <div className='flex flex-col '>
            <div className='px-[15x] py-[10px]'>
                <User />
            </div>
            <div>{userData?.roleData?.value === 'admin' && <span>Admin page</span>}</div>
            <div>
                <ul >
                    {(userData?.roleData?.value === 'admin' ? menuSideBarAdmin : menuSideBar).map((el,idx,arr) => { 
                        return (<li >
                            <Link className='hover:text-orange-500  flex flex-row items-center py-2 border-b border-gray-200 gap-2 '
                                key={el.id}
                                to={el.path}>
                                {el.icon}
                                <span className='w-full '>{el.text}</span>
                            </Link>
                        </li>)
                    })}
                    <li onClick={() => dispatch(actions.logout())} className='hover:text-orange-500 cursor-pointer flex flex-row items-center py-2 border-b border-gray-200 gap-2 '>
                        <IoExitOutline />
                        <span className='w-full'>Thoát</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBarSystem