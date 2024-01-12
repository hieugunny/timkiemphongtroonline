import actionType from '../actions/actionTypes'
const initState = {
    data: [],
    onePost: [],
    msg: '',
    msgOnePost: '',
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
            case actionType.ONE_POST:
                return {
                    ...state,
                    onePost : action.onePost || {},     
                    msgOnePost: action.msgOnePost || ''
                }  
        default:return state
    }
}
export default postReducer