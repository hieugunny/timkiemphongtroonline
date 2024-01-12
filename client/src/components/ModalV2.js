import React, { useEffect, useState } from 'react'
import icons from '../ultils/icons'
import { SliderRange } from '.'
import roomAreaTagList from '../ultils/roomAreaTagList'
import priceTagList from '../ultils/priceTagList'
const { GoArrowLeft } = icons
const ModalV2 = ({ setIsShowModal, type, getData, setPayload }) => {
    const [state, setState] = useState('')
    const [range, setRange] = useState([])
    useEffect(() => {
        if (state === 'close') {

            console.log('co vao day khong z');
            setIsShowModal(false)
            console.log();
        }
    }, [state])
    useEffect(() => {
    }, [range])
    function handlerSubmit() {
        if (range)
            setPayload(prev => ({ ...prev, [type]: [...range] }))
        setIsShowModal(false)
    }
    return (
        <div onClick={(e) => { if (e.target.className.includes('none-modal')) setState('close') }}
            className='none-modal fixed top-0 left-0 bottom-0 right-0 flex flex-col justify-center z-10 items-center bg-overlay-70'>
            <div className='bg-white w-[700px] rounded-md   h-[500px] flex flex-col  ' >
                <header className='flex flex-row px-[10px] items-center justify-between h-[45px] border-b border-gray-100'>
                    <GoArrowLeft size={24} onClick={(e) => { e.stopPropagation(); setIsShowModal(false) }} />
                    <span className='uppercase font-bold color-[#333333] text-sm'>{type}</span>
                    <span></span>
                </header>
                <div className='flex flex-col items-center justify-center   h-full '>

                    <h2 className='mb-[20px] h-[30px]'>{(range[0] || range[1]) && (range[0] === range[1] && range[1] !== 0 ? `Trên ${range[1]}` : `Từ ${range[0]} đến ${range[1]}`)}</h2>

                    {type === 'roomArea' && <SliderRange setRange={setRange} max={90} step={5} />}
                    {type === 'price' && <SliderRange setRange={setRange} max={15000000} step={500000} />}
                    <div className='flex justify-between w-full px-[40px]'>
                        <span>0</span>
                        <span>{type==='price'?'15 triệu+':'90'}</span>
                    </div>
                    <div className='flex flex-wrap justify-center'>
                        {type === 'roomArea' && roomAreaTagList.map(el => {
                            return (
                                <span className='px-2 bg-gray-400 mx-[5px] my-[7px] rounded-md'>{el.tag}</span>
                            )
                        })}
                        {type === 'price' && priceTagList.map(el => {
                            return (
                                <span className='px-2 bg-gray-400 mx-[5px] my-[7px] rounded-md'>{el.tag}</span>
                            )
                        })}
                    </div>
                </div>
                <div onClick={() => handlerSubmit()} className='uppercase hover:bg-yellow-500 cursor-pointer flex justify-center w-[700px] py-[5px] font-bold rounded-b-md bg-yellow-600 '>
                    <span className=''> Áp dụng</span>
                </div>
            </div>
        </div>
    )
}

export default ModalV2