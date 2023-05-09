const apiConfig = require('../config/api.config.js')
const updateDB = require('../update_db.js')
const Satellite = require('../models/satellite_model.js')
const fs = require('fs')
const multiparty = require('multiparty')

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

exports.downloadTLE = (req, res) => {
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

exports.downloadTLEList = (req, res) => {
  let result = Satellite.findByIdList(req.body.idList, (err, data) => {
    // console.log('result1: ', data)
    // 生成txt文件
    const filePath = './static/download/' + 'tle.txt'
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

exports.uploadTLE = (req, res) => {
  // console.log(req.body)
  // console.log(req.file)

  let uploadDir = './static/upload/'
  let form = new multiparty.Form()
  let fileList = []
  form.uploadDir = uploadDir
  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    console.log("form.parse")
    if (err) {
      console.log(err)
      res.cc('上传文件失败！')
    } 
    // 文件重命名
    files.file.forEach(file => {
      fileList.push('../static/upload/' + file.originalFilename)
      fs.rename(file.path, uploadDir + file.originalFilename, (err) => {
        if (err) {
          console.log('文件重命名失败!')
        }
      })
      // 更新数据库
      fs.readFile(file.path, (err, data) => {
        if (err) {
          console.log(err)
        }
        let lines = data.toString().split(/[\r\n]+/)
        lines = lines.map(line => line.trim())
        // console.log(lines)
        let tle_updated = new Date().toISOString()
        for (let i = 0; i < lines.length; i+=3) {
          let id = parseInt(lines[i+2].substring(2,7))
          // Create a Satellite
          const satellite = new Satellite({
            id: id,
            name: lines[i],
            tle1: lines[i+1],
            tle2: lines[i+2],
            tle_updated: tle_updated,
          })
          // Save Satellite in the database
          Satellite.create(satellite, (err, data) => {
            if (err) {
              res.cc(err.message)
            }
          })
        }
      })
    })
    res.send({
      status: 0,
      message: '更新TLE成功！'
    })
  })
}

