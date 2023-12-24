
import actionType from '../actions/actionTypes'
const initState = {
    provinces: [],
    districts: [],
    wards: [],
    msg: ''
}

const provinceReducer = (state = initState, action) => { 
    switch (action.type) {
        case actionType.GET_PROVINCE:
            return {
                ...state,
                provinces: action.provinces || [],
                msg: action.msg || ''
            }
        case actionType.GET_DISTRICT:
            return {
                ...state,
                districts: action.districts || [],
                msg: action.msg || ''
            }
        case actionType.GET_WARD:
            return {
                ...state,
                wards: action.wards || [],
                msg: action.msg || ''
            }
        default: return state
    }
}
export default provinceReducer