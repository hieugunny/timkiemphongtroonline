import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { List, Search, Pagination, SliderRange } from '../../components'
import { getPosts } from '../../store/actions' 
import icons from '../../ultils/icons'
const { IoMdArrowDropright } = icons
// import {IoMdArrowDropright} from '../../ultils/icons'
function Rental() {    
  return (
    <div className=' w-full flex flex-col gap-3 '> 
      <div className='w-[1000px]'> < Search  /> </div>
      <div> 
        <header>
          <h1 className='font-bold text-3xl mb-[10px] mt-[10px]'>Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2023</h1>
          <p className='text-[#65676b] font-normal text-xs'>Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2023. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.</p>
        </header>

        <section>
          <div className='local-item flex items-center justify-center'>
            <a className='flex flex-col border border-[borderItem] rounded-lg overflow-hidden w-[220px] mx-[10px] shadow-md ' href='' alt='Cho thuê phòng trọ Hồ Chí Minh' >
              <img src='https://images.myguide-cdn.com/md/common/large/577e5f74055f0-411759.png'
                className=' h-[110px] object-cover' />
              <span className='px-[10px] py-[12px] text-xs text-[#1266dd] font-bold text-center'>Phòng trọ Hồ Chí Minh</span>
            </a>
            <a className='flex flex-col border border-[borderItem] rounded-lg overflow-hidden w-[220px] mx-[10px] shadow-md ' href='' alt='Cho thuê phòng trọ Hồ Chí Minh' >
              <img src='https://image.vietnamnews.vn/uploadvnnews/Article/2018/10/3/HKLake263113810AM.jpg'
                className=' h-[110px] object-cover' />
              <span className='px-[10px] py-[12px] text-xs text-[#1266dd] font-bold text-center'>Phòng trọ Hà Nội</span>
            </a>
            <a className='flex flex-col border border-[borderItem] rounded-lg overflow-hidden w-[220px] mx-[10px] shadow-md ' href='' alt='Cho thuê phòng trọ Hồ Chí Minh' >
              <img src='https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/ur2mrg23d91mex03l4mw.jpg'
                className=' h-[110px] object-cover' />
              <span className='px-[10px] py-[12px] text-xs text-[#1266dd] font-bold text-center'>Phòng trọ Đà Nẵng</span>
            </a>
          </div>
        </section> 
      </div>

      <div className='w-full flex gap-4'>
        <div className='w-[70%] '>
          <div> 
            <List key={'list-phong-tro'} />
            <Pagination  />
          </div>
        </div>
        <div className='w-[30%]    '>
          <section className='p-[20px] mb-[20px] rounded-md shadow-lg border border-[borderItem]'>
            <div className='section-header mb-[15px]'>
              <span className='font-bold'>Xem theo giá</span>
            </div>
            <ul className='text-xs flex  flex-wrap'>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Dưới 1tr</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 1 - 2 triệu</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 2 - 3 triệu</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 3 - 5 triệu</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 5 - 7 triệu</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 7 - 10 triệu</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 10 - 15 triệu</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Trên 15 triệu</a></li>
            </ul>
          </section>

          <section className='p-[20px] mb-[20px] rounded-md shadow-lg border border-[borderItem]'>
            <div className='section-header mb-[15px]'>
              <span className='font-bold'>Xem diện tích</span>
            </div>
            <ul className='text-xs font-normal flex  flex-wrap'>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Dưới 20m²</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 20 - 30m²</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 30 - 50m²</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 50 - 70m²</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Từ 70 - 90m²</a></li>
              <li className=' flex items-center py-[5px] w-[136px] cursor-pointer'> <IoMdArrowDropright color='gray' /> <a className='ml-[5px] no-underline'>Trên 90m²</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>

  )
}

export default Rental