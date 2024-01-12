import React from 'react'
import path from '../ultils/contants';
import { Link } from 'react-router-dom';

const InputFormV3 = ({ value, text, isReadOnly, name, setValue, type}) => {
    const handler = (e) => {
        if (name) {
            console.log('co vao day ko ??');
            setValue((prev) => ({ ...prev, [name]: e.target.value }))
        }

    }
    return (
        <div className='flex flex-row py-5 gap-4 items-center'>
            <label className='font-bold w-[20%]'>{text}</label>
            {text === 'Mật khẩu'
                ? <div className='w-[80%]'>
                    <Link className='hover:text-orange-500  flex flex-row items-center py-2 border-b border-gray-200 gap-2 '

                        to={'/he-thong/'+path.CHANGE_PASSWORD}>
                        <span className='w-full text-blue-500 hover:underline'>Đổi mật khẩu</span>
                    </Link> 


                </div> : <input
                    onChange={(e) => { handler(e) }}
                    className={isReadOnly ? 'bg-gray-300 px-3 w-[80%] h-[40px] border-gray-300 rounded-md' : ' w-[80%] h-[40px] px-3 border border-gray-300 rounded-md'}
                    defaultValue={value}
                    readOnly={isReadOnly ? true : false} 
                    type={type || 'text'}/>}
        </div>
    )
}

export default InputFormV3