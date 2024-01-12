import React, { useState } from 'react'
import CreatePost from '../containers/system/CreatePost'
import icons from '../ultils/icons'


const {  } = icons
const EditPostV2 = ({ isShowEditPost, setIsShowEditPost }) => {
    const [isUpdate, setIsUpdate] = useState(false)
    return (
        <div
            onClick={(e) => {
                console.log(e.target.className);
                if (e?.target?.className?.includes('none-modal')) setIsShowEditPost(false)
            }}
            className=' none-modal fixed top-0 left-0 bottom-0 right-0 flex justify-center z-10 items-center bg-overlay-70'>
            <div className='bg-white w-[1000px] relative rounded-md px-4 py-2 p-1 mt-[300px] h-[1000px] overflow-auto'>
                <CreatePost isUpdate={isUpdate} setIsUpdate={setIsUpdate} isEdit={isShowEditPost} />
                <div className='flex flex-row gap-2 fixed bottom-[50px] right-[320px]'>
                    <button onClick={() => {setIsUpdate(true); }} className='px-2 py-1  hover:bg-blue-400    bg-blue-500 rounded-md '>Cập nhật</button>
                    <button className='     bg-red-500 rounded-md px-2 py-1 hover:bg-red-400'>Ung thư</button>
                </div>
            </div>
        </div>
    )
}

export default EditPostV2