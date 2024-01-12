import actionType from '../actions/actionTypes'
const initState = {
    count:-1
}

const appReducer = (state = initState,action ) => {  
    switch (action.type) {
        case actionType.FAVOURITE:
            return {
                ...state,
                count: action.count  
            }  
        default:return state
    }
}
export default appReducer