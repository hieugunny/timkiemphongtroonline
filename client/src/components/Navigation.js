import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { apiGetCategories } from '../apis/category'
const nav1 = [
  { name: 'Trang chủ', path: 'home' },
  { name: 'Cho thuê phòng trọ', path: 'home2' },
  { name: 'Nhà cho thuê', path: 'home3' },
  { name: 'Cho thuê căn hộ', path: 'home1' },
  { name: 'Tìm người ở ghép', path: 'home22' }
]
const active = 'hover:bg-secondary2 h-full content-center pt-1 px-4 bg-secondary2  '
const notactive = 'hover:bg-secondary2 h-full content-center pt-1 px-4 bg-secondary1  '
function Navigation() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories()
      if (response.data.err === 1)
        setCategories(response.data.data)
    }
    fetchCategories()

  }, [])

  return (
    <div className=' w-full text-white  bg-secondary1 h-[50px] mb-[10px] flex flex-row items-center' >
      <div className='flex   h-[50px]  font-medium text-sm'>
        <NavLink
          to={'/Home'}
          className={({ isActive }) => isActive ? active : notactive}
        >{'Trang chủ'}</NavLink>
      </div>
      {categories.length > 0 && categories.map(el => {
        return (
          <div key={el.code} className='flex  h-[50px]  font-medium text-sm'>
            <NavLink
              to={el.code}
              className={({ isActive }) => isActive ? active : notactive}
            >{el.name}</NavLink>
          </div>
        )
      })}

    </div>
  )
}

export default Navigation