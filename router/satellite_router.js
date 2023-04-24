const express = require('express')
const router = express.Router()
const satelliteController = require('../controller/satellite_controller.js')


// 创建卫星数据
router.post('/create', satelliteController.create)

// 获取指定卫星数据
router.get('/info', satelliteController.findOne)

// 获取指定卫星列表数据
router.get('/info_list', satelliteController.findList)

// 获取所有的卫星数据
router.get('/info_all', satelliteController.findAll)

// 更新数据库中的卫星信息
router.put('/update', satelliteController.update)

// 根据Id删除一个卫星信息
router.delete('/delete', satelliteController.delete)

// 删除所有卫星信息
router.delete('/delete_all', satelliteController.deleteAll)

module.exports = router