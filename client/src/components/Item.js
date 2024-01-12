
import React, { useEffect, useState, memo } from 'react'
import slugify from 'slugify'
import icons from '../ultils/icons'
import path from '../ultils/contants'
import { Link, useNavigate } from 'react-router-dom'
import starListCss from '../ultils/starListCss'
const imgs = JSON.parse("[\"https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/12/12/e9b318a457e0ffbea6f1_1702361241.jpg\",\"https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/12/12/3abe94a6dbe273bc2af3_1702361244.jpg\",\"https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/12/12/c1ea67d8289c80c2d98d_1702361241.jpg\",\"https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/12/12/e9b318a457e0ffbea6f1_1702361241.jpg\"]")
const { GrStar, RiHeartFill, RiHeartLine } = icons
const Item = ({ object,id }) => {
    const navigate = useNavigate()
    const images = JSON.parse(object?.images) 
    const [isHoverHeart, setisHoverHeart] = useState(false)
    return (
        // <div className='w-full flex  border-t border-red-500 '>
        <div key={'post'+id} className='w-full cursor-pointer flex border-t border-red-500 mt-2 px-[20px] pt-[15px] h-[270px]  '>
           {/* <Link to={`${path.DETAIL}/${slugify(object?.title?.replace('/',''))}/${object?.id}`}>
           
           </Link> */}
            <div onClick={()=> { navigate(`${path.DETAIL}/${slugify(object?.title?.replace('/',''))}/${object?.id}`)}} className='w-[300px] flex flex-wrap items-center gap-[2px] relative' >
                <img src={images[0]} alt='preview' className='w-[140px] h-[120px] object-cover' />
                <img src={images[1]} alt='preview' className='w-[140px] h-[120px] object-cover' />
                <img src={images[2]} alt='preview' className='w-[140px] h-[120px] object-cover' />
                <img src={images[3]} alt='preview' className='w-[140px] h-[120px] object-cover' />
                <span className='px-1 bg-overlay-70 rounded-md text-white absolute bottom-1 left-1'>{images.length} ảnh</span>
                <span className='absolute bottom-1 right-4'
                    onMouseEnter={() => setisHoverHeart(true)}
                    onMouseLeave={() => setisHoverHeart(false)}
                >
                    {isHoverHeart ? <RiHeartFill className=' ' size={26} color='red' />
                        : <RiHeartLine size={26} color='white' />}</span>
            </div>
           
            <div className='w-3/5 pl-[10px]'>
                <div onClick={()=> { navigate(`${path.DETAIL}/${slugify(object?.title?.replace('/',''))}/${object?.id}`)}}  
                className={'cursor-pointer hover:underline header mb-[10px] h-[50px]  text-sm font-bold  line-clamp-2 '  }>
                    {/* <div className={+object.star !=1?`uppercase text-star-${+object.star}`:` text-star-${+object.star}`}> */}
                    <div className={starListCss[+object.star-1]}>
                        <span>
                            {Array.from({ length: +object?.star }, (_, index) => (
                                +object?.star !== 1 ? <GrStar key={index} className='inline-block' size={20} color='#ffd454' /> : null
                            ))}
                        </span>
                        {object?.title}
                    </div>
                </div>
                <div className='content-item flex justify-around items-center mb-[10px]'>
                    <span className='text-base text-[#16c784] font-bold'>{object?.price > 1000000 ? `${object?.price / 1000000} triệu/tháng` : `${(object?.price).toLocaleString('en-US', { useGrouping: false })} đồng/tháng`} </span>
                    <span className='text-xs '>{object?.roomArea}m²</span>
                    <span className='text-xs'>{object?.district}, {object?.province}</span>
                </div>
                <div className='description-item my-[10px] flex  '>
                    <p className='text-sm text-[#8a8d91]    line-clamp-3 h-[100px] inline-block '> {object?.description.split('\\n').join(' ')}</p>
                </div>
                <div className='footer-item flex justify-between items-center bottom-0'>
                    <div className='flex items-center gap-2'>
                        <img src={object?.userData.avatar || 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg'}
                            alt='avatar'
                            className='w-[30px] h-[30px] rounded-full object-cover ' />
                        <span>{object?.userData.name}</span>
                    </div>
                    <div className='text-xs'>
                        <span className='px-[7px] py-[3px]  mr-1 rounded-md text-white bg-[#1266dd]'>Gọi {object?.zalo || '0xxxyyyzzz'}</span>
                        <span className='px-[7px] py-[3px] rounded-md border border-[#1266dd]'>Nhắn Zalo</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)