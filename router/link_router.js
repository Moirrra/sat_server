const express = require('express')
const router = express.Router()
const linkController = require('../controller/link_controller.js')


// 创建Link数据
router.post('/create', linkController.create)

// 创建多个Link数据
router.post('/create_many', linkController.createMany)

// 获取指定Link数据
router.get('/info', linkController.findOne)

// 获取指定Collection的Link信息
router.get('/info_collection', linkController.findByCollection)

// 获取指定Satellite的Link信息
router.get('/info_satellite', linkController.findBySatellite)

// 获取所有的Link数据
router.get('/info_all', linkController.findAll)

// 根据Id删除一个Link信息
router.delete('/delete', linkController.delete)

// 根据collection_id删除Link信息
router.delete('/delete_collection', linkController.deleteByCollection)

// 根据satellite_id删除Link信息
router.delete('/delete_satellite', linkController.deleteBySatellite)

// 根据collection_id和satellite_id删除Link信息
router.delete('/delete_col_sat', linkController.deleteByColSat)

// 根据所有Link信息
router.delete('/delete_all', linkController.deleteAll)


module.exports = router