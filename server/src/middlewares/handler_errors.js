import create_error from 'http-errors'

export const badRequest = (err, res) => { 

    const error = create_error.BadRequest(err) 
    return res.status(error.status).json({
        error:-1,
        message:error.message
    })
}
export const interalServerError = (err,res) => {
    const error = create_error.InternalServerError(err) 
    return res.status(error.status).json({
        error:-1,
        message:error.message
    })
}
export const notFound = (err,res) => {
    const error = create_error.NotFound(err) 
    return res.status(error.status).json({
        error: -1,
        message: error.message
    })
}

export const unAuth = (err,res,isChecked) => {
    const error = create_error.Unauthorized(err) 
    return res.status(error.status).json({
        error: isChecked?2:-1,
        message: error.message
    })
}