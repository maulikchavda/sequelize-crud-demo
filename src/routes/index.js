const router = require('express').Router()
const crudRoute = require('./crud')
router.use('/api/projects', crudRoute)

module.exports = router
