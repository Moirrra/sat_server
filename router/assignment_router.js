const express = require('express')
const router = express.Router()
const assignmentController = require('../controller/assignment_controller.js')


// 创建Assignment数据
router.post('/create', assignmentController.create)

// 获取指定Assignment数据
router.get('/info', assignmentController.findOne)

// 获取指定Collection的Assignment信息
router.get('/info_collection', assignmentController.findByCollection)

// 获取指定Satellite的Assignment信息
router.get('/info_satellite', assignmentController.findBySatellite)

// 获取所有的Assignment数据
router.get('/info_all', assignmentController.findAll)

// 根据Id删除一个Assignment信息
router.delete('/delete', assignmentController.delete)

// 根据collection_id删除一个Assignment信息
router.delete('/delete_collection', assignmentController.deleteByCollection)

// 根据satellite_id删除一个Assignment信息
router.delete('/delete_satellite', assignmentController.deleteBySatellite)

// 根据所有Assignment信息
router.delete('/delete_all', assignmentController.deleteAll)


module.exports = router