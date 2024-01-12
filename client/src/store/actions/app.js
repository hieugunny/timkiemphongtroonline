import actionTypes from './actionTypes'

export const setCountFavourite = (value) => async (dispatch) => {
    try {
        dispatch({ 
            type: actionTypes.FAVOURITE,
            count: value
        })
    } catch (error) {
        dispatch({
            type: actionTypes.FAVOURITE,
            count: -1
        })
    }
} 
 export const setSearch = (value) => async (dispatch) => {
    try {
        dispatch({ 
            type: actionTypes.FAVOURITE,
            count: value
        })
    } catch (error) {
        dispatch({
            type: actionTypes.FAVOURITE,
            count: -1
        })
    }
}  