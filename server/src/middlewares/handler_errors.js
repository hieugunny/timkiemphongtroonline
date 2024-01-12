import create_error from 'http-errors'

export const badRequest = (err, res) => {
    console.log(err);
    const error = create_error.BadRequest(err) 
    return res.status(error.status).json({
        err: 0,
        msg: error.message
    })
}
export const interalServerError = (err, res) => {
    const error = create_error.InternalServerError(err)
    return res.status(error.status).json({
        err: 0,
        msg: error.message
    })
}
export const notFound = (err, res) => {
    const error = create_error.NotFound(err)
    return res.status(error.status).json({
        err: 0,
        msg: error.message
    })
}

export const unAuth = (err, res, isChecked) => {
    const error = create_error.Unauthorized(err)
    return res?.status(error?.status).json({
        err: isChecked ? 0 : -1, // 0 là token hết hạn, -1 là token không hợp lệ
        msg: error.message
    })
}