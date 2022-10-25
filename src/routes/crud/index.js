const router = require('express').Router()

const {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} = require('../../controller/projectController')

router.post('/', createProject)
router.get('/', getProjects)
router.get('/:id', getProjectById)
router.put('/:id', updateProjectById)
router.delete('/:id', deleteProjectById)

module.exports = router
