const Assignment = require('../models/assignment_model.js')

exports.init = (newAssignment) => {
  const assignment = new Assignment({ ...newAssignment })
  Assignment.create(assignment, (err, data) => {
    if (err) {
      console.log(err.message)
    }
  })
}

exports.create = (req, res) => {
  if (!req.body) {
    res.cc('Content can not be empty!')
  }
  const assignment = new Assignment(req.body.collection_id, req.body.satellite_id)
  Assignment.create(assignment, (err, data) => {
    if (err) {
      res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '创建Assignment成功！',
        data,
      })
    }
  })
}

// 根据Id查询一个Assignment信息
exports.findOne = (req, res) => {
  req.query.id && Assignment.findById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的Assignment`)
      } else res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '获取Assignment数据成功！',
        data,
      })
    }
  })
}

// 查询所有Assignment信息
exports.findAll = (req, res) => {
  Assignment.findAll((err, data) => {
    if (err) {
      res.cc(err)
    } else {
      res.send({
        status: 0,
        message: '获取Assignment数据成功！',
        data,
      })
    }
  })
}

// 查询指定Collection的Assignment信息
exports.findByCollection = (req, res) => {
  req.query.id && Assignment.findByCollection(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到collection_id为${req.query.id}的Assignment`)
      } else res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '获取Assignment数据成功！',
        data,
      })
    }
  })
}

// 查询指定Satellite的Assignment信息
exports.findBySatellite = (req, res) => {
  req.query.id && Assignment.findBySatellite(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到satellite_id为${req.query.id}的Assignment`)
      } else res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '获取Assignment数据成功！',
        data,
      })
    }
  })
}

// 根据Id删除一个Assignment信息
exports.delete = (req, res) => {
  req.query.id && Assignment.removeById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的Assignment`)
      } else res.cc(err)
    } else {
      res.send({
        status: 0,
        message: '删除Assignment数据成功！',
      })
    }
  })
}

// 根据collection_id删除一个Assignment信息
exports.deleteByCollection = (req, res) => {
  req.query.id && Assignment.removeByCollection(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到collection_id为${req.query.id}的Assignment`)
      } else res.cc(err)
    } else {
      res.send({
        status: 0,
        message: '删除Assignment数据成功！',
      })
    }
  })
}

// 根据satellite_id删除一个Assignment信息
exports.deleteBySatellite = (req, res) => {
  req.query.id && Assignment.removeBySatellite(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到satellite_id为${req.query.id}的Assignment`)
      } else res.cc(err)
    } else {
      res.send({
        status: 0,
        message: '删除Assignment数据成功！',
      })
    }
  })
}

// 删除所有Assignment信息
exports.deleteAll = (req, res) => {
  Assignment.removeAll((err, data) => {
    if (err) {
      res.cc(err)
    } else {
      
      res.send({
        status: 0,
        message: '删除所有Assignment数据成功！',
      })
    }
  })
}