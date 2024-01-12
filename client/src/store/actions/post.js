import actionTypes from './actionTypes'
import { apiGetPosts, apiGetPostById } from '../../apis/post'
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

export const getOnePost = (id) => async (dispatch) => { 
    try {
        const res = await apiGetPostById(id)  
        if(res?.data.err === 1){
            dispatch({
                type: actionTypes.ONE_POST,
                onePost: res.data.data, 
                msgOnePost: res.data.msg
            })
        } else dispatch({
            type: actionTypes.ONE_POST,
            onePost: null,
            msgOnePost: res.data.msg
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST,
            data: null  
        })
    }
}  