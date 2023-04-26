const express = require('express')
const router = express.Router()
const orbitController = require('../controller/orbit_controller.js')

// 初始化轨道场景数据
router.post('/init', orbitController.init)

// 创建一个卫星轨道数据
router.post('/create', orbitController.create)


module.exports = router