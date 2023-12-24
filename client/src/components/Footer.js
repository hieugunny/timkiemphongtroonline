import React from 'react'

const Footer = () => {
  return (
    <div className='w-full shadow-md border border-borderItem mt-[40px] block px-[50px] pt-[20px]'>
      <h4 className='font-bold text-center  '>Tại sao lại chọn PhongTro123.com?</h4>
      <p className='text-sm my-[14px]'>Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào là trang web đứng top google về các từ khóa:
        <a className='text-[#1266dd] outline-none font-semibold'>cho thuê phòng trọ</a>, nhà trọ,
        <a className='text-[#1266dd] outline-none font-semibold'>thuê nhà nguyên căn</a>,
        <a className='text-[#1266dd] outline-none font-semibold'>cho thuê căn hộ</a>,
        <a className='text-[#1266dd] outline-none font-semibold'>tìm người ở ghép</a>,
        <a className='text-[#1266dd] outline-none font-semibold'>cho thuê mặt bằng</a>...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn</p>
      <div className='flex block text-center '>
        <div className='w-[25%] flex flex-col'>
          <span className='font-bold text-2xl mt-[5px]'>116.998+</span>
          <span className='text-sm'>Thành viên</span>
        </div>
        <div className='w-[25%] flex flex-col'>
          <span className='font-bold text-2xl mt-[5px]'>103.348+</span>
          <span className='text-sm'>Tin đăng</span>
        </div>
        <div className='w-[25%] flex flex-col'>
          <span className='font-bold text-2xl mt-[5px]'>300.000+</span>
          <span className='text-sm'>Lượt truy cập/tháng</span>
        </div>
        <div className='w-[25%] flex flex-col'>
          <span className='font-bold text-2xl mt-[5px]'>2.500.000+</span>
          <span className='text-sm'>Lượt xem/tháng</span>
        </div>
      </div>
    </div>
  )
}

export default Footer