import actionTypes from './actionTypes'
import { apiGetPosts } from '../../apis/post'
export const getPosts = (offset) => async (dispatch) => { 
    try {
        const res = await apiGetPosts(offset)  
        if(res?.data.err === 1){
            dispatch({
                type: actionTypes.GET_POST,
                data: res.data.data.rows,
                count: res.data.data.count,
                msg: res.data.msg
            })
        } else dispatch({
            type: actionTypes.GET_POST,
            data: null,
            msg: res.data.msg
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST,
            data: null  
        })
    }
}  