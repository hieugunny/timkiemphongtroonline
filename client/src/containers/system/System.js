import React from 'react'
import { Outlet } from 'react-router-dom' 

const System = () => {
  return (
    <div className='w-1100 m-auto bg-[#f5f5f5]   '> 

      <div className='w-full'>
        <Outlet />
      </div> 
    </div>
  )
}

export default System