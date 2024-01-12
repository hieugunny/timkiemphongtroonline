import React, { useEffect, useMemo, useState } from 'react'
import { Loading, TableV2 } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import path from '../../ultils/contants'
import { apiGetWard } from '../../apis/province'
import { apiGetUsers } from '../../apis/user'

const ManageUser = () => {
    const navigate = useNavigate() 
    const { userData } = useSelector(state => state.user)
    const [isLoading, setIsLoading] = useState(false) 
    const [users, setUsers] = useState([])
    const { data: posts } = useSelector(state => state.post) 
    const rows = userData?.postData?.map(item => {
      return {
        id: item.id,
        images: JSON.parse(item.images)[0],
        price: item.price.toLocaleString() + '/tháng',
        startedAt: item.startedAt,
        expiredAt: item.expiredAt,
        isHidden: item.isHidden
  
      }
    })
    useEffect(() => {
      const fetchGetUsers = async () => {
        const response = await apiGetUsers()
        console.log(response.data.data);
        if(response.data.err === 1) {
            setUsers(response.data.data)
        }
      } 
    fetchGetUsers()
    }, [])
    
    function handlerDate(date) {
      date = date.split('T')
      
    } 
    const keys2 = [
      { hearder: 'ID', value: 'id' },
      { hearder: 'Ảnh đại diện', value: 'avatar' },
      { hearder: 'Họ và tên', value: 'name' },
      { hearder: 'Số bài đã đăng', value: 'countPost' }, 
      { hearder: 'Ngày đăng ký', value: 'createdAt' }, 
      { hearder: 'Tùy chọn', value: 'option' }, 
    //   { hearder: 'Trạng thái', value: 'status' } 
    ]
    const column = keys2?.map(item => {
      return {
        Header: item.hearder,
        accessor: item.value
      }
    })
    const columns = useMemo(
      () => [
        {
          // first group - TV Show
          Header: "Quản lý bài đăng",
          // First group columns
          columns: column
        },
      ]
    );
    if (userData?.roleData?.value !== 'admin'){ 
        return <Navigate replace={true} to={`${path.HOME}`}/> 

    }


    return (

        <div className='pb-[60px]'> {isLoading && <Loading />} 
            <h1 className='text-[35px] mt-[5px] border-b border-gray-300 pb-[4px]'>Quản lý người dùng</h1>
            <div className='w-full flex flex-row'>
                <div className='w-full px-[5x] py-5'>

                    <TableV2 columns={columns} data={users} />
                </div>
            </div>
        </div>
    )
}

export default ManageUser