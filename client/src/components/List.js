import React, { useEffect, useState } from 'react'
import { Header, Navigation } from '../containers/public'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { Button, Item } from '.'
import { getPosts } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
const List = () => {
  const dispatch = useDispatch()
  const { data, msg, count } = useSelector(state => state.post)
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    console.log('co thay doi khi pagination thay doi?');
    let searchParamsObject = {}

    let params = []
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }

    let category_code = location.pathname.replace('/', '')
    category_code = category_code === '' || category_code === 'HOME' ? null : category_code
    searchParamsObject.category_code = category_code
    params.forEach(item => {
      searchParamsObject[item[0]] = item[1]
    })
    console.log(searchParamsObject);
    dispatch(getPosts(searchParamsObject))
    // window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [location.pathname, searchParams])
  return (
    <div className='flex flex-col border border-[borderItem]'>
      <div className='w-full p-4'>
        <div className='flex flex-row justify-between'>
          <span className='font-bold text-xl'>Tổng {count} kết quả</span>
          <span className='text-gray'>Cập nhật lúc 12:00 30/6/2023</span>
        </div>
        <div className='flex flex-row items-center'>
          <span className='flex items-center'> Sắp xếp:</span>
          <Button
            text={'Mặc định'}
            textColor={'text-[#333]'}
            bgColor={'bg-[#f1f1f1]'}
            custom={'shadow-md mt-0 mx-1 hover:font-bold hover:bg-[#e7f0f7] px-4 py-2'} />
          <Button
            text={'Mới nhất'}
            textColor={'text-[#333]'}
            bgColor={'bg-[#f1f1f1]'}
            custom={'shadow-md mt-0 mx-1 hover:font-bold hover:bg-[#e7f0f7] px-4 py-2'} />
          <Button
            text={'Có video'}
            textColor={'text-[#333]'}
            bgColor={'bg-[#f1f1f1]'}
            custom={'shadow-md mt-0 mx-1 hover:font-bold hover:bg-[#e7f0f7] px-4 py-2'} />
        </div>
      </div>
      <div className='w-full'>
        {data || data.length != 0 ? data?.map(el => {
          return <Item key={el.id} object={el} />
        }) : '(Không tìm thấy kết quả)'}
      </div>
    </div>

  )
}

export default List