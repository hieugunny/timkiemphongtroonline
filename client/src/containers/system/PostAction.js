import React, { useEffect, useState } from 'react'
import { Loading, Select, SelectActionPost } from '../../components'
import starList from '../../ultils/starList'
import { apiGetPostById, apiUpdatePost } from '../../apis/post'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import path from '../../ultils/contants'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../store/actions'
const PostAction = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const params = useParams()
    const [value, setValue] = useState({
        star: 1,
        days: 5
    })
    const [extensionList, setExtensionList] = useState(() => {
        let list = []
        for (let index = 5; index < 50; index++) {
            list.push({
                name: index,
                value: index
            })
        }
        return list
    })
    function handler() {
        const fetch = async () => {
            setIsLoading(true)
            const response = await apiUpdatePost({
                id: params.id,
                star: value.star,
                startedAt: new Date(Date.now() + 7 * 3600 * 1000),
                expiredAt: new Date(Date.now() + (+value.days * 24 * 3600 * 1000) + 7 * 3600  * 1000)
            })
            setIsLoading(false)
            if (response.data.err === 1) {
                dispatch(getCurrentUser())
                Swal.fire("Success", "Gia hạn và tăng sao thành công", 'success')
                navigate(`${path.SYSTEM2}${path.MANAGE_POST}`)

            }
            else Swal.fire("Success", "Gia hạn và tăng sao thành công", 'success')
        }
        fetch()
    }
    useEffect(() => {
        const fetchGetPost = async () => {
            const response = await apiGetPostById(params.id)
            if (response.data.err === 1) {
                setPost(response.data.data)
            }
        }
        setTimeout(() => {
            fetchGetPost()
        }, 200);
    }, [])

    return (
        <>

            <div className='pb-[60px]'> {isLoading && <Loading />}
                <h1 className='text-[35px] mt-[5px] border-b border-gray-300 pb-[4px]'>Gia hạn, tăng sao</h1>
                <div className='w-full flex flex-row '>
                    <div className='w-full px-[5x] py-5'>
                        <SelectActionPost setValue={setValue} name={'star'} text={'Tăng sao'} options={starList} defaultOption={{ name: `${post.star}`, value: post.star }} />
                        <SelectActionPost setValue={setValue} name={'days'} text={'Gia hạn'} options={extensionList} />
                    </div>
                </div>
                <span className='text-2xl'><strong>Tổng cộng: </strong>{(value.days * starList?.find(el => el.value === +value.star)?.price).toLocaleString()} VNĐ</span>
                <button onClick={() => handler()} className='w-full bg-green-400 rounded-md p-1 mt-[20px] hover:bg-green-300'>
                    Thanh toán
                </button>
            </div>
        </>
    )
}

export default PostAction