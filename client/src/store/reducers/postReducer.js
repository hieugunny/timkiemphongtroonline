import actionType from '../actions/actionTypes'
const initState = {
    data: [],
    msg: '',
    count: ''
}

const postReducer = (state = initState,action ) => {  
    switch (action.type) {
        case actionType.GET_POST:
            return {
                ...state,
                data : action.data || [],                                                                                       
                count: action.count|| 0,
                msg: action.msg || ''
            }  
        default:return state
    }
}
export default postReducer