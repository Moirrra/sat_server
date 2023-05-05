const Satellite = require('../models/satellite_model.js')

exports.init = (newSatellite) => {
  const satellite = new Satellite({...newSatellite})
  Satellite.create(satellite, (err, data) => {
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
  // Create a Satellite
  const satellite = new Satellite({
    id: req.body.id,
    name: req.body.name,
    tle1: req.body.tle1,
    tle2: req.body.tle2,
    tle_updated: req.body.tle_updated,
  })
  // Save Satellite in the database
  Satellite.create(satellite, (err, data) => {
    if (err) {
      res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '创建卫星成功！',
        data,
      })
    }
  })
}

// 根据Id查询一个卫星信息
exports.findOne = (req, res) => {
  req.query.id && Satellite.findById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的卫星`)
      } else res.cc('获取卫星数据失败！')
    } else {
      res.send({
        status: 0,
        message: '获取卫星数据成功！',
        data,
      })
    }
  })
}

exports.findList = (req, res) => {
  req.query.idList && Satellite.findByIdList(req.query.idList, (err, data) => {
    if (err) {
      res.cc('获取卫星数据失败！')
    } else {
      res.send({
        status: 0,
        message: '获取卫星数据成功！',
        data,
      })
    }
  })
}

// 查询所有卫星信息
exports.findAll = (req, res) => {
  Satellite.findAll((err, data) => {
    if (err) {
      res.cc('获取卫星数据失败！')
    } else {
      res.send({
        status: 0,
        message: '获取卫星数据成功！',
        data,
      })
    }
  })
}

// 根据Id更新一个卫星信息
exports.update = (req, res) => {
  Satellite.updateById(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.body.id}的卫星`)
      } else res.cc('更新卫星数据失败！')
    } else {
      res.send({
        status: 0,
        message: '更新卫星数据成功！',
      })
    }
  })
}

// 根据Id删除一个卫星信息
exports.delete = (req, res) => {
  req.query.id && Satellite.removeById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的卫星`)
      } else res.cc('删除卫星数据失败！')
    } else {
      res.send({
        status: 0,
        message: '删除卫星数据成功！',
      })
    }
  })
}

// 删除所有卫星信息
exports.deleteAll = (req, res) => {
  Satellite.removeAll((err, data) => {
    if (err) {
      res.cc('删除所有卫星数据失败！')
    } else {
      res.send({
        status: 0,
        message: '删除所有卫星数据成功！',
      })
    }
  })
}