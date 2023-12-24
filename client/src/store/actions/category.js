import actionTypes from './actionTypes'
import { apiGetCategories } from '../../apis/category'
export const getCategories = () => async (dispatch) => { 
    try {
        const res = await apiGetCategories()  
        if(res?.data.err === 1){
            dispatch({
                type: actionTypes.GET_CATEGORY,
                categories: res.data.data, 
                msg: res.data.msg
            })
        } else dispatch({
            type: actionTypes.GET_CATEGORY,
            categories: null,
            msg: res.data.msg
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORY,
            categories: null  
        })
    }
}  