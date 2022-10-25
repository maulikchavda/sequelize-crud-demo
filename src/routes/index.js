const router = require('express').Router()
const crudRoute = require('./crud')
router.use('/projects', crudRoute)

module.exports = router
