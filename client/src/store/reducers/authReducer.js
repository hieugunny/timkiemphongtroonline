import actionTypes from '../actions/actionTypes'
const initState = {
    isLoggedIn: false,
    token: {},
    msg:'',
    update:true,
    err:0
}
const authReducer = (state = initState, action) => {  
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS: 
            return {
                ...state,
                isLoggedIn: true,
                msg: action.data.msg,
                token: {
                    access_token : action.data.access_token,
                    refesh_token : action.data.refesh_token,
                },
                update: !state.update,
                err:1
                 
            }
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: action.data?.msg,
                update: !state.update,
                err:0
                
            }
            case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: '',
                update: !state.update,
                err:0 
            } 
        default:
            return state;
    }
}
export default authReducer