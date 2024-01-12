import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import { getCategories } from '../store/actions';

const HeaderSystem = () => {
    const { categories } = useSelector(state => state.category)
    const dispath = useDispatch()
    useEffect(() => {
        dispath(getCategories())
    }, [])

    return (
        <div className=' w-full text-white  bg-[#055699] h-[50px] mb-[10px] flex flex-row justify-start items-center' >
            <div className='text-lg w-[200px] px-[20px]'> <Link to={'/'}>
                 Phongtro456
            </Link> </div> 
            <div className='navigation flex flex-row items-center '>
                <div className='flex   h-[50px]  font-medium text-xs py-[7px] pr-[14px] pt-2 pl-[10px]'>
                    <NavLink
                        to={'/Home'}
                        className={'hover:text-orange-500'}
                    >{'Trang chủ'}</NavLink>
                </div>
                {categories.length > 0 && categories.map(el => {
                    return (
                        <div key={el.code} className='flex  h-[50px]  font-medium text-xs py-[7px] pr-[14px] pt-2 pl-[10px]'>
                            <NavLink
                                to={el.code}
                                className={'hover:text-orange-500'}
                            >{el.name}</NavLink>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default HeaderSystem