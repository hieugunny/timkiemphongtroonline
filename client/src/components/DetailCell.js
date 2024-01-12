import React, { useEffect, useState } from 'react'
import { apiGetPostById, apiSetHiddenPost } from '../apis/post'; 
import EditPostV2 from './EditPostV2';
import { getCurrentUser, getOnePost } from '../store/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import path from '../ultils/contants';

const DetailCell = ({ PostId}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowEditPost, setIsShowEditPost] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [post, setPost] = useState({})
   useEffect(() => {
     setHidden(post?.isHidden)  
   }, [post])
   
  const fetchPost = async (param) => {
    const response = await apiGetPostById(param)
    if (response.data.err === 1 && response.status === 200) {  
      setPost(response.data.data);
    }
  }
  const handlerAddress = (address) => {
    let arr = address.filter(item => item)
    return arr.reduce((value, currentValue) => value ? value + ', ' + currentValue : currentValue, '')
  }
  useEffect(() => {
    fetchPost(PostId)

  }, [])
  const handlerEdit = () => { 
    dispatch(getOnePost(PostId))
    setTimeout(() => { 
      setIsShowEditPost(true);
    }, 100);
  }
  const handlerHidden = () => {  
    const fetchSetHidden = async () => {
      const response = await apiSetHiddenPost({id:post.id, isHidden: !post.isHidden})
      if (response.data.err === 1 ) {  
        setPost({...post, isHidden: !post.isHidden});
        dispatch(getCurrentUser())
      }
    }
    fetchSetHidden()
  }
  return ( 
    <div> 
      {isShowEditPost && < EditPostV2 setIsShowEditPost={setIsShowEditPost} isShowEditPost={isShowEditPost}/>} 
      <h4 className='line-clamp-2'><strong>Tiêu đề: </strong> {post.title}</h4>
      <h4 className=''><strong>Địa chỉ: </strong> {handlerAddress([post.numberHouse, post.street, post.ward, post.district, post.province])}</h4>
      <div className='flex flow-row gap-1 mt-[10px]'>
        <button onClick={() =>{navigate(`${path.SYSTEM2}${path.POSTACTION}/${post.id}`)}} className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-[1px] hover:scale-110 hover:bg-indigo-500 duration-100 border border-gray-500 px-[4px] rounded-md '>Gia hạn</button>
        <button onClick={() =>{navigate(`${path.SYSTEM2}${path.POSTACTION}/${post.id}`)}} className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-[1px] hover:scale-110 hover:bg-indigo-500 duration-100 border border-gray-500 px-[4px] rounded-md '>Tăng sao</button>
        <button onClick={() => handlerHidden()} className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-[1px] hover:scale-110 hover:bg-indigo-500 duration-100 border border-gray-500 px-[4px] rounded-md '>{hidden ? 'Hiện': 'Ẩn'}</button>
        <button onClick={() =>handlerEdit()}  className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-[1px] hover:scale-110 hover:bg-indigo-500 duration-100 border border-gray-500 px-[4px] rounded-md '>Chỉnh sửa</button>
      </div>
    </div>
  )
}

export default DetailCell