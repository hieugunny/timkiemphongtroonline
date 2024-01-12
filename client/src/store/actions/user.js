import actionTypes from './actionTypes'
import { apiGetCurrentUser } from '../../apis/user'
export const getCurrentUser = () => async (dispatch) => { 
    try {
        const res = await apiGetCurrentUser()  
        if(res?.data?.err === 1){ 
            
            dispatch({
                type: actionTypes.GET_CURRENT_USER,
                userData: res.data?.data, 
                msg: res.data?.msg
            })
        } else  {
            dispatch({
                type: actionTypes.GET_CURRENT_USER,
                userData: null,
                msg: res.data?.msg
            }) 
            dispatch({
                type: actionTypes.LOGOUT 
            })
        }
    } catch (error) {  
        dispatch({
            type: actionTypes.GET_CURRENT_USER,
            userData: null  
        })
        dispatch({
            type: actionTypes.LOGOUT 
        })
    }
}  