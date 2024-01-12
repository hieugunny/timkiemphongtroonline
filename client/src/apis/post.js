import axiosConfig from '../axios.config'
import axios from 'axios';
export const apiCreatePost =async (data) => new Promise(async (resolve, reject) => {
    try {
        const res = await axiosConfig({
            method: 'post',
            url: '/post/create',
            data
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 
export const apiGetPosts =async (params) => new Promise(async (resolve, reject) => {
    try {
        const res = await axiosConfig({
            method: 'get',
            url: '/post/',
            params
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 
export const apiGetPostById =async (params) => new Promise(async (resolve, reject) => {
    try {
        const res = await axiosConfig({
            method: 'get',
            url: `/post/getone/${params}`, 
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 
export const apiUpdatePost =async (data) => new Promise(async (resolve, reject) => { 
    try {
        const res = await axiosConfig({
            method: 'put',
            url: `/post/update-post`,
            data 
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 
export const apiUploadImages =async (data) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios({
            method: 'put',
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
            data: data
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 
export const apiSetHiddenPost =async (data) => new Promise(async (resolve, reject) => {
    try { 
        const res = await axiosConfig({
            method: 'put',
            url: `/post/set-hidden`,
            data: data
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
}); 