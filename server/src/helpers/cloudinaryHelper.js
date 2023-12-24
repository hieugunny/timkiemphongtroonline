import { v2 as cloadinary } from 'cloudinary'


export const deleteArrayImage = (arrayImage) => {
    arrayImage?.map(el => cloadinary.uploader.destroy(el?.fileName))
}