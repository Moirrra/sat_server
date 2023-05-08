const express = require('express')
const router = express.Router()
const dataController = require('../controller/data_controller')
// const multer = require('multer')
// const upload = multer({ dest: './static/upload'})

// 更新satellite数据库
router.get('/update_tle', dataController.updateSat)

// 更新satelliteInfo数据库
router.get('/update_sat', dataController.updateSatInfo)

router.get('/download_tle', dataController.downloadTLE)

router.post('/download_tle_list', dataController.downloadTLEList)

// router.post('/upload_tle', upload.array('files'), dataController.uploadTLE)

router.post('/upload_tle',dataController.uploadTLE)

module.exports = router