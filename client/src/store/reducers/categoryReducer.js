import actionType from '../actions/actionTypes'
const initState = {
    categories: [],
    msg: '' 
}

const categoryReducer = (state = initState,action ) => {  
    switch (action.type) {
        case actionType.GET_CATEGORY:
            return {
                ...state,
                categories : action.categories || [],   
                msg: action.msg || ''
            }  
        default:return state
    }
}
export default categoryReducer