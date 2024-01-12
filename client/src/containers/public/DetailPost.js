import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { object } from 'joi';
import { apiGetPostById } from '../../apis/post';
import starListCss from '../../ultils/starListCss'
import icons from '../../ultils/icons';
import '../../assets/css/slideShow.css'
import { AuthorAsSide, Map } from '../../components';
const { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, GrStar, FaMapMarkerAlt, AiOutlineDollarCircle, GoClock, CiHashtag, BsTextareaResize } = icons
const DetailPost = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [numeracal, setNumeracal] = useState(1)
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 

        const fectchGetPost = async () => {
            const response = await apiGetPostById(params.postId) 
            if (response.data.err === 1) setPost(response.data.data)
        }
    setTimeout(() => {
        fectchGetPost()
    }, 200);
    }, [])
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {  
            setNumeracal(next+1)
        },
        afterChange: current => {}
    };

    return (
        <div className='w-full flex flex-row gap-5 mt-[20px]'>
            <div className='w-[70%] shadow-lg rounded-md '>
                <div className='relative bg-black  '>
                    <Slider {...settings} className='w-full   flex justify-center bg-black ' >
                        {JSON.parse(post?.images || '[]')?.map((item, idx) => { 
                            return (
                                <div className='h-[400px] w-full flex justify-center items-center bg-black '>
                                    <img className='object-contain m-auto h-full w-auto' src={item} />
                                </div>
                            )
                        }
                        )}
                    </Slider>
                    <span className='absolute text-white z-30 text-[16px]  bottom-[-5px] font-medium left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>{numeracal}/{JSON.parse(post?.images || '[]').length}</span>
                </div>
                <div className='p-[20px]'>
                    <div className={'font-bold text-[24px] ' + starListCss[+post?.star - 1]}>
                        {Array.from({ length: +post?.star }, (_, index) => (
                            +post?.star !== 1 ? <GrStar key={index} className='inline-block' size={40} color='#ffd454' /> : null
                        ))}
                        {post.title}
                    </div>
                    <div className='mt-[10px] text-[16px]'>
                        <span className='flex flex-row items-center '><FaMapMarkerAlt color='#1081e0' className='mr-[5px]' />  Địa chỉ:   {`${post?.numberHouse} ${post?.street}, ${post?.ward}, ${post?.district}, ${post?.province}`}</span>
                    </div>
                    <div className='flex flex-row justify-around mt-[10px]'>

                        <div className=' flex '>
                            <span className='flex flex-row items-center gap-2 text-[#16c784] text-[21px] font-bold'> <AiOutlineDollarCircle color='#000' className='' size={25} />{post?.price < 1000000 ? `${post?.price.toLocaleString()} đồng/tháng` : `${post?.price / 1000000} triệu/tháng`}</span>
                        </div>

                        <div className=' flex '>
                            <span className='flex flex-row text-[16px] items-center gap-2'> <BsTextareaResize />{post?.roomArea + 'm²'}</span>
                        </div>

                        <div className=' flex '>
                            <span className='flex flex-row text-[16px] items-center gap-2'> <GoClock />{'Hôm nay'}</span>
                        </div>

                        <div className=' flex '>
                            <span className='flex flex-row text-[16px] items-center gap-2'> <CiHashtag />{`${post?.id}`}</span>
                        </div>
                    </div>
                    <div className='mt-[30px]'>
                        <h1 className='mb-[10px]' >Thông tin mô tả</h1>
                        <p className='text-[15px] '>{post?.description?.split('\\n').map(item => {
                            return (<>
                                {item}<br />
                            </>)
                        })}</p>
                    </div>
                    <div className='mt-[15px]'>
                        <h1 className='mb-[10px]'>Thông tin mô tả</h1>
                        <table className='w-full text-[14px]'>
                            <tbody >
                                <tr >
                                    <td className='w-[30%] border border-gray-400 p-[10px]'>Mã tin:</td>
                                    <td className='border border-gray-400 p-[10px]'>#{post?.id}</td>
                                </tr>
                                <tr >
                                    <td className='w-[30%] border border-gray-400 p-[10px]'>Khu vực:</td>
                                    <td className='border border-gray-400 p-[10px]'>{post?.province}</td>
                                </tr>
                                <tr >
                                    <td className='w-[30%] border border-gray-400 p-[10px]'>Loại tin rao:</td>
                                    <td className='border border-gray-400 p-[10px]'>{post?.categoryData?.value}</td>
                                </tr>
                                <tr >
                                    <td className='w-[30%] border border-gray-400 p-[10px]'>Đối tượng thuê:</td>
                                    <td className='border border-gray-400 p-[10px]'>{post?.rentObject === 'all' ? 'Tất cả' : (post?.rentObject === 'male' ? 'Nam' : 'Nữ')}</td>
                                </tr>
                                <tr >
                                    <td className='w-[30%] border border-gray-400 p-[10px]'>Gói tin:</td>
                                    <td className='border border-gray-400 p-[10px]'>{post?.star} Sao</td>
                                </tr>
                                <tr >
                                    <td className='w-[30%] border border-gray-400 p-[10px]'>Ngày đăng:</td>
                                    <td className='border border-gray-400 p-[10px]'>{post?.createdAt}</td>
                                </tr>
                                <tr >
                                    <td className='w-[30%] border border-gray-400 p-[10px]'>Ngày hết hạn:</td>
                                    <td className='border border-gray-400 p-[10px]'>{post?.expiredAt}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-[15px]'>
                        <h1 className='mb-[10px]'>Thông tin liên hệ</h1>
                        <table className='w-full text-[14px]'>
                            <tr>
                                <td className='w-[30%] border border-gray-400 p-[10px]'>Liên hệ:</td>
                                <td className='border border-gray-400 p-[10px]'>{post?.userData?.name}</td>
                            </tr>
                            <tr>
                                <td className='w-[30%] border border-gray-400 p-[10px]'>Điện thoại:</td>
                                <td className='border border-gray-400 p-[10px]'>{post?.userData?.mobile}</td>
                            </tr>
                            <tr>
                                <td className='w-[30%] border border-gray-400 p-[10px]'>Zalo:</td>
                                <td className='border border-gray-400 p-[10px]'>{post?.userData?.zalo}</td>
                            </tr>
                        </table>
                    </div>
                    <div className='mt-[15px]'>
                        <Map />

                    </div>
                </div>
            </div>
            <div className='w-[30%] shadow-lg rounded-md '>
                <AuthorAsSide author={{ ...post.userData, postId: post.id }} />
            </div>
        </div>
    )
}

export default DetailPost