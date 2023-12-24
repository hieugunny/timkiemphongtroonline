import actionType from '../actions/actionTypes'
const initState = {
    isSearch: false
}

const appReducer = (state = initState,action ) => {  
    switch (action.type) {
        case actionType.SEARCH:
            return {
                ...state,
                isSearch: action.isSearch  
            }  
        default:return state
    }
}
export default appReducer