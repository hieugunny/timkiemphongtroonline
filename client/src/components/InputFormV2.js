import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const InputFormV2 = ({ type, text, tag, setValue, width, name, value, invalidFields, isEdit }) => {
    const {onePost} = useSelector(state=> state.post) 
    const [isFocus, setIsFocus] = useState(false)
    const [firstLetter, setFirstLetter] = useState(false)
    return (
        <div className={width + ' flex flex-col py-5 z-50'}>
            <label className='font-bold m-1'>{text}</label>
            <div className=' rounded-md    flex flow-row relative'>
                {name !== 'description' ?
                    <input
                        onFocus={() => setIsFocus(true)}
                        onChange={(e) => {
                            setFirstLetter(true)
                            setValue((prev) => ({ ...prev, [name]: e.target.value })) 
                        }}
                        defaultValue={isEdit && onePost[name]}
                        type={type ? type : 'text'}
                        spellCheck={false}
                        className={'w-full px-[10px] py-[5px]   outline-none border border-gray-400 rounded-md'} />
                    :
                    <textarea

                        onFocus={() => { setIsFocus(true) }}
                        defaultValue={isEdit && onePost[name]}
                        onChange={(e) => {
                            setFirstLetter(true)
                            setValue((prev) => ({ ...prev, [name]: e.target.value }))
                        }}
                        spellCheck={false}
                        className=' w-full   px-[10px] py-[5px]   outline-none border border-gray-400 rounded-md'
                        rows={10}
                    ></textarea>
                }
                {tag && <span className='h-full px-[10px] py-[5px]  bg-gray-300'>{tag}</span>}

            </div>
            {firstLetter
                && isFocus
                && invalidFields?.length > 0
                && invalidFields?.some(el => el.name == name)
                && <small className='text-red-300 italic mt-2'>{invalidFields?.find(el => el.name === name)?.message}</small>}
        </div>
    )
}

export default InputFormV2