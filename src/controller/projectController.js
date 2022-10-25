const { sequelize } = require('../models/index')
const { newProjectValidation } = require('../services/newProjectValidation')
const response = require('../services/response')
const constants = require('../services/constant')
const Models = require('../models')

module.exports = {
  createProject: async (req, res) => {
    const t = await sequelize.transaction()
    try {
      const reqParams = req.body
      newProjectValidation(reqParams, res, async (validate) => {
        if (validate) {
          const projectExist = await Models.projects.findAll({
            where: { project_unique_name: reqParams.project_unique_name },
            transaction: t,
          })
          if (projectExist.length > 0) {
            await t.rollback()
            return response.successResponseWithoutData(
              res,
              'Project already exists',
              constants.FAIL,
            )
          } else {
            const projectData = {
              project_name:
                reqParams.project_name.length > 0
                  ? reqParams.project_name
                  : null,
              project_unique_name:
                reqParams.project_unique_name.length > 0
                  ? reqParams.project_unique_name
                  : null,
              project_type:
                reqParams.project_type.length > 0
                  ? reqParams.project_type
                  : null,
            }
            await Models.projects.create(projectData, {
              transaction: t,
            })
            await t.commit()
            return response.successResponse(
              res,
              projectData,
              1,
              'Project created successfully',
            )
          }
        } else {
          await t.rollback()
          return response.errorResponse(
            res,
            'Internal Server Error',
            constants.FAIL,
          )
        }
      })
    } catch (error) {
      await t.rollback()
      return response.errorResponse(
        res,
        'Internal Server Error',
        constants.RESPONSE_CODE.INTERNAL_SERVER,
      )
    }
  },
  getProjects: async (req, res) => {
    try {
      const projectList = await Models.projects.findAll()
      return response.successResponse(res, projectList, 1)
    } catch (error) {
      return response.errorResponse(
        res,
        'Internal Server Error',
        constants.RESPONSE_CODE.INTERNAL_SERVER,
      )
    }
  },
  getProjectById: async (req, res) => {
    try {
      const reqParams = req.params
      const projectById = await Models.projects.findAll({
        where: { id: reqParams.id },
      })
      if (projectById.length === 0) {
        return response.successResponseWithoutData(
          res,
          'Project does not exist',
          constants.FAIL,
        )
      }
      return response.successResponse(res, projectById, 1)
    } catch (error) {
      return response.errorResponse(
        res,
        'Internal Server Error',
        constants.RESPONSE_CODE.INTERNAL_SERVER,
      )
    }
  },
  updateProjectById: async (req, res) => {
    try {
      const reqParams = req.body
      const reqParamsId = req.params.id
      newProjectValidation(reqParams, res, async (validate) => {
        if (validate) {
          const projectExist = await Models.projects.findAll({
            where: { id: reqParamsId },
          })
          if (projectExist.length === 0) {
            return response.successResponseWithoutData(
              res,
              'Project does not exist',
              constants.FAIL,
            )
          }
          const projectData = {
            project_name:
              reqParams.project_name.length > 0 ? reqParams.project_name : null,
            project_unique_name:
              reqParams.project_unique_name.length > 0
                ? reqParams.project_unique_name
                : null,
            project_type:
              reqParams.project_type.length > 0 ? reqParams.project_type : null,
          }
          await Models.projects.update(projectData, {
            where: { id: reqParamsId },
          })
          return response.successResponse(
            res,
            projectData,
            1,
            'Project updated successfully',
          )
        } else {
          return response.errorResponse(
            res,
            'Internal Server Error',
            constants.FAIL,
          )
        }
      })
    } catch (error) {
      return response.errorResponse(
        res,
        'Internal Server Error',
        constants.RESPONSE_CODE.INTERNAL_SERVER,
      )
    }
  },
  deleteProjectById: async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
      const reqParamsId = req.params.id
      const projectExist = await Models.projects.findAll({
        where: { id: reqParamsId },
      })
      if (projectExist.length === 0) {
        return response.successResponseWithoutData(
          res,
          'Project does not exist',
          constants.FAIL,
        )
      }
      await Models.projects.destroy({ where: { id: reqParamsId } })
      await transaction.commit()
      return response.successResponse(
        res,
        null,
        1,
        'Project deleted successfully',
      )
    } catch (error) {
      return response.errorResponse(
        res,
        'Internal Server Error',
        constants.RESPONSE_CODE.INTERNAL_SERVER,
      )
    }
  },
}
