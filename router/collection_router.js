const express = require('express')
const router = express.Router()
const collectionController = require('../controller/collection_controller.js')


// router.get('/init', )

// 创建Collection数据
router.post('/create', collectionController.create)

// 获取指定Collection数据
router.get('/info', collectionController.findOne)

// 获取所有的Collection数据
router.get('/info_all', collectionController.findAll)

// 更新数据库中的Collection
router.put('/update', collectionController.update)

// 根据Id删除一个Collection信息
router.delete('/delete', collectionController.delete)

// 删除所有Collection信息
router.delete('/delete_all', collectionController.deleteAll)

module.exports = router