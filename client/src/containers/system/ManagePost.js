import React, { useEffect, useMemo, useState } from 'react'
import { Loading, Table } from '../../components'
import { useSelector } from 'react-redux'
import axios from 'axios' 

const ManagePost = () => {
  const { data: posts } = useSelector(state => state.post)
  const { userData } = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)
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
  function handlerDate(date) {
    date = date.split('T')
    
  }
  const keys = [

    'id',
    'images',
    'title',
    'price',
    'startedAt',
    'expiredAt'
  ]
  const keys2 = [
    { hearder: 'Mã tin', value: 'id' },
    { hearder: 'Ảnh đại diện', value: 'images' },
    { hearder: 'Chi tiet', value: 'detail' },
    { hearder: 'Giá thuê', value: 'price' },
    { hearder: 'Ngày bắt đầu', value: 'startedAt' },
    { hearder: 'Ngày hết hạn', value: 'expiredAt' },
    { hearder: 'Trạng thái', value: 'status' } 
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

  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  return (
    <>
      
      <div className='pb-[60px]'> {isLoading && <Loading />}
        <h1 className='text-[35px] mt-[5px] border-b border-gray-300 pb-[4px]'>Quản lý tin đăng</h1>
        <div className='w-full flex flex-row'>
          <div className='w-full px-[5x] py-5'>

            <Table columns={columns} data={rows} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ManagePost
