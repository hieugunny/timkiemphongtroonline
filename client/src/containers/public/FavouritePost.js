import React, { useEffect, useState } from 'react'
import { Item, Search } from '../../components'
import { apiGetPostById } from '../../apis/post'
const FavouritePost = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchGetPost = async () => {
      const favouriteList = JSON.parse(localStorage.getItem("post_favourite") || '[]')
      favouriteList.forEach(async el => {
        console.log(el);
        const response = await apiGetPostById(el)
        if (response.data.err !== 0) {
          setData((prev) => ([...prev, response?.data?.data]))
        }
      });
    }
    fetchGetPost()
    console.log(data);
  }, [])

  return (
    <>
      <div className='w-[1000px] py-[10px] '> < Search /> </div>
      <h1 className='text-[28px] font-bold py-[10px]'>Tin đã lưu</h1>
      <div className='flex flex-col border   bg-gray-100 rounded-md shadow-md'>
        <div className={'w-full min-h-[220px] flex flex-col justify-center items-center'} >
          {data && data.length != 0 ? data?.map(el => {
            console.log(data.length);
            return <Item key={el.id} object={el} />
          }) : <div>  <span className='text-red-500 font-bold py-10 px-10 text-[20px]'>Danh sách rỗng.</span></div>
          }
          </div>
      </div>
    </>

  )
}

export default FavouritePost