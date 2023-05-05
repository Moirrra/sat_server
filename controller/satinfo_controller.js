const SatelliteInfo = require('../models/satinfo_model.js')
 
exports.init = (satInfo) => {
  const satelliteInfo = new SatelliteInfo({...satInfo})
  SatelliteInfo.create(satelliteInfo, (err, data) => {
    if (err) {
      console.log(err.message)
    }
    console.log(data)
  })
}

exports.create = (req, res) => {
  if (!req.body) {
    res.cc('Content can not be empty!')
  }

  const satelliteInfo = new SatelliteInfo({
    id: req.body.id,
    name: req.body.name,
    status: req.body.status,
    countries: req.body.countries,
  })

  SatelliteInfo.create(satelliteInfo, (err, data) => {
    if (err) {
      res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '创建卫星信息成功！',
        data,
      })
    }
  })
}

// 根据Id查询一个卫星信息
exports.findOne = (req, res) => {
  req.query.id && SatelliteInfo.findById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的卫星信息`)
      } else res.cc('获取卫星信息数据失败！')
    } else {
      res.send({
        status: 0,
        message: '获取卫星信息数据成功！',
        data,
      })
    }
  })
}

// 查询所有卫星信息
exports.findAll = (req, res) => {
  SatelliteInfo.findAll((err, data) => {
    if (err) {
      res.cc('获取卫星信息数据失败！')
    } else {
      res.send({
        status: 0,
        message: '获取卫星信息数据成功！',
        data,
      })
    }
  })
}

// 根据Id更新一个卫星信息
exports.update = (req, res) => {
  SatelliteInfo.updateById(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.body.id}的卫星信息`)
      } else res.cc('更新卫星信息数据失败！')
    } else {
      res.send({
        status: 0,
        message: '更新卫星信息数据成功！',
      })
    }
  })
}

// 根据Id删除一个卫星信息
exports.delete = (req, res) => {
  req.query.id && SatelliteInfo.removeById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的卫星信息`)
      } else res.cc('删除卫星信息数据失败！')
    } else {
      res.send({
        status: 0,
        message: '删除卫星信息数据成功！',
      })
    }
  })
}

// 删除所有卫星信息
exports.deleteAll = (req, res) => {
  SatelliteInfo.removeAll((err, data) => {
    if (err) {
      res.cc('删除所有卫星信息数据失败！')
    } else {
      res.send({
        status: 0,
        message: '删除所有卫星信息数据成功！',
      })
    }
  })
}