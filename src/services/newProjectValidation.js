const Joi = require('joi')
const response = require('../services/response')

module.exports = {
  newProjectValidation: (req, res, callback) => {
    const schema = Joi.object({
      project_name: Joi.string().required(),
      project_unique_name: Joi.string().required(),
      project_type: Joi.string().required(),
    })
    const { error } = schema.validate(req)
    if (error?._original.project_name === '') {
      return response.errorResponse(res, 'Please enter project name')
    }
    if (error?._original.project_unique_name === '') {
      return response.errorResponse(res, 'Please enter project unique name')
    }
    if (error?._original.project_type === '') {
      return response.errorResponse(res, 'Please enter project type')
    }
    return callback(true)
  },
}
