import { LiaGgCircle } from 'react-icons/lia';
import axios from '../axios.config'
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions';
 
 
 

export const apiGetUsers =async () => new Promise(async (resolve, reject) => { 
    try {
        const res = await axios({
            method: 'get',
            url: '/user/getusers', 
        })
        resolve(res)
    } catch (error) { 
        console.log(error);
        reject(error)
    }
});
export const apiGetCurrentUser =async () => new Promise(async (resolve, reject) => { 
    try {
        const res = await axios({
            method: 'get',
            url: '/user/getcurrent', 
        })
        resolve(res)
    } catch (error) { 
        console.log(error);
        reject(error)
    }
});
export const apiUpdateUser =async (data) => new Promise(async (resolve, reject) => { 
    try {
        const res = await axios({
            method: 'put',
            url: '/user/updateUser', 
            data
        })
        resolve(res)
    } catch (error) { 
        console.log(error);
        reject(error)
    }
});
export const apiChangePassword =async (data) => new Promise(async (resolve, reject) => { 
    try {
        const res = await axios({
            method: 'put',
            url: '/user/changepassword', 
            data
        })
        resolve(res)
    } catch (error) { 
        console.log(error);
        reject(error)
    }
});