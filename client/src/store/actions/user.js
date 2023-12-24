import actionTypes from './actionTypes'
import { apiGetCurrentUser } from '../../apis/user'
export const getCurrentUser = () => async (dispatch) => { 
    try {
        const res = await apiGetCurrentUser()  
        console.log(res.data.data);
        if(res?.data?.err === 1){
            dispatch({
                type: actionTypes.GET_CURRENT_USER,
                userData: res.data?.data, 
                msg: res.data?.msg
            })
        } else dispatch({
            type: actionTypes.GET_CURRENT_USER,
            userData: null,
            msg: res.data?.msg
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT_USER,
            userData: null  
        })
    }
}  