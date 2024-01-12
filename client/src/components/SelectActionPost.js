import React, { useState } from 'react'
import { useSelector } from 'react-redux';
const SelectActionPost = ({ text, options, defaultOption, setValue,name}) => { 
    function handlerSelectedOption() {

    }
    return (
        < div className='flex flex-col w-[30%]   '>
            <label className='font-bold m-1'>{text}</label>
            <select //
                className='rounded-md border border-gray-300 p-2'
            // onFocus={() => setIsFocus(true)}
            onChange={(e) => setValue((prev) => ({ ...prev, [name]: e.target.value }))}
            >
                {options?.map((item, idx) => {
                    return (
                        <option
                            selected={+defaultOption?.value === +item.value}
                            value={item.value}
                            key={item.name + item.code}>
                            {item.name}</option>
                    )
                })}
            </select>
            {/* {isFocus
                && invalidFields?.length > 0
                && invalidFields?.some(el => el.name == name)
                && <small className='text-red-300 italic mt-2'>{invalidFields?.find(el => el.name === name)?.message}</small>} */}
        </div>
    )
}

export default SelectActionPost