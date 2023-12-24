import actionTypes from './actionTypes'
export const setSearch = (value) => async (dispatch) => {
    try {
        dispatch({ 
            type: actionTypes.SEARCH,
            isSearch: value
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST,
            isSearch: false
        })
    }
}  