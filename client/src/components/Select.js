import React, { useState } from 'react'
import { useSelector } from 'react-redux';
const Select = ({ isEdit, text, options, setValue, name, setCode, isSelectFirst, invalidFields }) => {
    const [isFocus, setIsFocus] = useState(false)
    const { onePost } = useSelector(state => state.post)
    const objectRentalData = [
        { name: 'Tất cả', code: 'all' },
        { name: 'Nữ', code: 'female' },
        { name: 'Nam', code: 'male' },
    ]
    function handlerSelectedOption(item) {
        if (isEdit) {
            if (name === 'category_code' || name === 'rentObject') {
                return item?.code === onePost[name]
            }
            return item?.name?.trim().replace('Tỉnh ', '') === onePost[name]
        }
    }
    function handler(e) {
        console.log(e.target.value.split(';')[1]);
        if (name === 'category_code' || name === 'rentObject')

            setValue((prev) => ({ ...prev, [name]: e.target.value.split(';')[1] }))
        else
            setValue((prev) => ({ ...prev, [name]: e.target.value.split(';')[0] }))
        setCode({ // Phục vụ việc hiển thị dữ liệu vùng 
            value: e.target.value.split(';')[0],
            code: e.target.value.split(';')[1]
        })
    }
    return (
        < div className='flex flex-col w-[30%]   '>
            <label className='font-bold m-1'>{text}</label>
            <select //
                className='rounded-md border border-gray-300 p-2'
                onFocus={() => setIsFocus(true)}
                onChange={(e) => { handler(e) }}>
                <option value={''}>{`--Chọn ${text} --`}</option>
                {options?.map((item, idx) => {
                    return (
                        <option
                            selected={handlerSelectedOption(item) || (idx === 0 && isSelectFirst)}
                            value={`${item.name};${item.code}`}
                            key={item.name + item.code}>
                            {item.name}</option>
                    )
                })}
            </select>
            {isFocus
                && invalidFields?.length > 0
                && invalidFields?.some(el => el.name == name)
                && <small className='text-red-300 italic mt-2'>{invalidFields?.find(el => el.name === name)?.message}</small>}
        </div>
    )
}

export default Select