const apiConfig = require('../config/api.config.js')
const updateDB = require('../update_db.js')
const Satellite = require('../models/satellite_model.js')
const fs = require('fs')

exports.updateSat = async (req, res) => {
  try {
    await updateDB.getSatellites(apiConfig.tle_url)
    res.send({
      status: 0,
      message: '更新satellite数据库成功！',
    })
  } catch (error) {
    res.cc('更新satellite数据库失败！')
  }
}

exports.updateSatInfo = async (req, res) => {
  try {
    await updateDB.getSatelliteInfo(apiConfig.sat_url)
    res.send({
      status: 0,
      message: '更新satellite_info数据库成功！',
    })
  } catch (error) {
    res.cc('更新satellite_info数据库失败！')
  }
}

exports.downloadTLE = async (req, res) => {
  let result = Satellite.findById(req.query.id, (err, data) => {
    // console.log('result1: ', data)
    // 生成txt文件
    const filePath = './static/download/' + 'tle_' + data.id.toString() + '.txt'
    const content = data.name + '\n' + data.tle1 + '\n' + data.tle2
    console.log(content)
    fs.writeFile(filePath, content, (err) => {
      if (err) throw err
      res.download(filePath)
    })
  })
}

exports.downloadTLEList = async (req, res) => {
  let result = Satellite.findByIdList(req.body.idList, (err, data) => {
    // console.log('result1: ', data)
    // 生成txt文件
    const filePath = './static/download/' + 'tle_selected.txt'
    let content = ""
    for (let i = 0; i < data.length; i++) {
      content += data[i].name + '\n' + data[i].tle1 + '\n' + data[i].tle2 + '\n'
    }
    console.log(content)
    fs.writeFile(filePath, content, (err) => {
      if (err) throw err
      res.download(filePath)
    })
  })
}

