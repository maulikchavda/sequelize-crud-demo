'use strict'

module.exports = {
  successResponse(res, data, code = 1, message, extras) {
    const response = {
      data,
      meta: {
        code: code,
        message: message,
      },
    }
    if (extras) {
      Object.keys(extras).map((key) => {
        if (Object.hasOwnProperty.call(extras, key)) {
          response.meta[key] = extras[key]
        }
      })
    }
    return res.send(response)
  },
  successResponseWithoutData(res, message, code = 1) {
    const response = {
      data: null,
      meta: {
        code,
        message,
      },
    }
    return res.send(response)
  },
  errorResponse(res, message, code = 400) {
    const response = {
      code,
      message,
    }
    return res.status(code).send(response)
  },
  errorResponseWithoutData(res, message, code = 0) {
    const response = {
      data: null,
      meta: {
        code,
        message,
      },
    }
    return res.send(response)
  },
  validationErrorResponse(res, message, code = 400) {
    const response = {
      code,
      message,
    }
    return res.status(code).send(response)
  },
}
