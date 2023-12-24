import actionTypes from './actionTypes'
import { apiGetProvince, apiGetDistrict, apiGetWard } from '../../apis/province'
export const getProvince = (code) => async (dispatch) => {
    try {
        const res = await apiGetProvince(code) 
        if (res?.data.err === 1) {
            dispatch({
                type: actionTypes.GET_PROVINCE,
                provinces: res.data.data,
                msg: res.data.msg
            })
        } else dispatch({
            type: actionTypes.GET_PROVINCE,
            provinces: null,
            msg: res.data.msg
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PROVINCE,
            provinces: null
        })
    }
}
export const getDistrict = (code) => async (dispatch) => {
    try {
        const res = await apiGetDistrict(code)  
        if (res?.data.err === 1) {
            dispatch({
                type: actionTypes.GET_DISTRICT,
                districts: res.data.data.rows,
                msg: res.data.msg
            })
        } else
            dispatch({
                type: actionTypes.GET_DISTRICT,
                districts: null,
                msg: res.data.msg
            })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_DISTRICT,
            districts: null
        })
    }
}
export const getWard = (code) => async (dispatch) => {
    try {
        const res = await apiGetWard(code)
        if (res?.data.err === 1) {
            dispatch({
                type: actionTypes.GET_WARD,
                wards: res.data.data.rows,
                msg: res.data.msg
            })
        } else dispatch({
            type: actionTypes.GET_WARD,
            wards: null,
            msg: res.data.msg
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_WARD,
            wards: null
        })
    }
}  