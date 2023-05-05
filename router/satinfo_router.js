const express = require('express')
const router = express.Router()
const satelliteInfoController = require('../controller/satinfo_controller.js')


// 创建卫星数据
router.post('/create', satelliteInfoController.create)

// 获取指定卫星数据
router.get('/info', satelliteInfoController.findOne)


// 获取所有的卫星数据
router.get('/info_all', satelliteInfoController.findAll)

// 更新数据库中的卫星信息
router.put('/update', satelliteInfoController.update)

// 根据Id删除一个卫星信息
router.delete('/delete', satelliteInfoController.delete)

// 删除所有卫星信息
router.delete('/delete_all', satelliteInfoController.deleteAll)

module.exports = router