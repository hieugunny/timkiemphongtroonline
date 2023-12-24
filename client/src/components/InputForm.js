import React from 'react'

function InputForm({ id, label, type, value, setValue , invalidFields, setInvalidateFields}) { 
    return (
        <div>
            <label htmlFor='phone'>{label}</label>
            <input
                type={type || 'text'}
                id={id}
                className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full' 
                value={value} 
                onFocus={() => setInvalidateFields([])}
                onChange={(e) => setValue(prev =>{ 
                    return { ...prev, [type]: e.target.value }
                } )}
            />
            {invalidFields.length >0 
            && invalidFields.some(el => el.name == type) 
            && <small className='text-red-500 italic'>{invalidFields.find(el=> el.name === type)?.message}</small>}
        </div>
    )
}

export default InputForm