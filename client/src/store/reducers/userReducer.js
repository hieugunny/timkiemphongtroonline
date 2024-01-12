import actionType from '../actions/actionTypes'
const initState = {
    userData: {},
    msg: ''
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.GET_CURRENT_USER:
            return {
                ...state,
                userData: action.userData || {},
                msg: action.msg || ''
            }
        default: return state
    }
}
export default userReducer