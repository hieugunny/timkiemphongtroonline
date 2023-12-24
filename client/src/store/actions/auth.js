import actionTypes from './actionTypes'
import { apiLogin, apiRegister } from '../../apis/auth'
export const register = (payLoad) => async (dispatch) => { 
    try {
        const res = await apiRegister(payLoad)
        console.log(res);
        if(res?.data.err === 1){
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: res.data
            })
        } else dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: res.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null  
        })
    }
}
export const login = (payLoad) => async (dispatch) => { 
    try {
        const res = await apiLogin(payLoad) 
        console.log(res); 
        console.log('login'); 
        if(res?.data.err === 1){ 
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: res.data
            })
        } else dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: res.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: false
        })
    }
}

export const logout = () => ({type: actionTypes.LOGOUT})