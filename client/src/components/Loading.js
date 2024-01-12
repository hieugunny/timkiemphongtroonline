import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loading = () => {
  console.log('loading........');
  return (
    <div className='none-modal fixed top-0 left-0 bottom-0 right-0 flex justify-center z-10 items-center bg-overlay-70'>
 
        <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
    </div>
  )
}

export default Loading