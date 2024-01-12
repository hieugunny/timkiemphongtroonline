import React from 'react'

const InputReadOnly = ({width, text, value }) => {
    return ( 
        <div className={width}>
        <label className='font-bold m-1'>{text}</label>
        <input className={ 'bg-gray-300 w-full px-[10px] py-[5px]  outline-none border border-gray-400 rounded-md'}
         readOnly 
          value={value} />
      </div>
    )
}

export default InputReadOnly