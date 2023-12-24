import React from 'react'

import icons from '../ultils/icons'

const {FiDelete} = icons
const SearchItem = ({ icon, text,defaultText }) => { 
    return (
        <div className='flex flex-row text-[14px] h-[35px] items-center rounded-md px-[15px] gap-1 bg-white'>
            <span className=' '>{icon}</span>
            <span className={text ? 'font-bold max-w-[212px] w-full  truncate' :" max-w-[212px] w-full text-gray-500 truncate"} >{text || defaultText}</span>
            <span className=' '><FiDelete /></span>
        </div>
    )
}

export default SearchItem