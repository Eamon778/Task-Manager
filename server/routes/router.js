const express = require('express')
const {allTasks} = require('../controllers/controller')

const router = express.Router()

router.route('/tasks').get(allTasks)

module.exports = router