const Link = require('../models/link_model.js')

exports.init = (newLink) => {
  const link = new Link({ ...newLink })
  Link.create(link, (err, data) => {
    if (err) {
      console.log(err.message)
    }
  })
}

exports.create = (req, res) => {
  if (!req.body) {
    res.cc('Content can not be empty!')
  }
  const link = new Link(req.body.collection_id, req.body.from_id, req.body.to_id)
  Link.create(link, (err, data) => {
    if (err) {
      res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '创建Link成功！',
        data,
      })
    }
  })
}

// 根据Id查询一个Link信息
exports.findOne = (req, res) => {
  req.query.id && Link.findById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的Link`)
      } else res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '获取Link数据成功！',
        data,
      })
    }
  })
}

// 查询所有Link信息
exports.findAll = (req, res) => {
  Link.findAll((err, data) => {
    if (err) {
      res.cc(err)
    } else {
      res.send({
        status: 0,
        message: '获取Link数据成功！',
        data,
      })
    }
  })
}

// 查询指定Collection的Link信息
exports.findByCollection = (req, res) => {
  req.query.id && Link.findByCollection(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到collection_id为${req.query.id}的Link`)
      } else res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '获取Link数据成功！',
        data,
      })
    }
  })
}

// 查询指定Satellite的Link信息
exports.findBySatellite = (req, res) => {
  req.query.id && Link.findBySatellite(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到from_id或to_id为${req.query.id}的Link`)
      } else res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '获取Link数据成功！',
        data,
      })
    }
  })
}

// 根据Id删除一个Link信息
exports.delete = (req, res) => {
  req.query.id && Link.removeById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的Link`)
      } else res.cc(err)
    } else {
      res.send({
        status: 0,
        message: '删除Link数据成功！',
      })
    }
  })
}

// 根据collection_id删除一个Link信息
exports.deleteByCollection = (req, res) => {
  req.query.id && Link.removeByCollection(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到collection_id为${req.query.id}的Link`)
      } else res.cc(err)
    } else {
      res.send({
        status: 0,
        message: '删除Link数据成功！',
      })
    }
  })
}

// 根据satellite_id删除一个Link信息
exports.deleteBySatellite = (req, res) => {
  req.query.id && Link.removeBySatellite(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到from_id或to_id为${req.query.id}的Link`)
      } else res.cc(err)
    } else {
      res.send({
        status: 0,
        message: '删除Link数据成功！',
      })
    }
  })
}

// 删除所有Link信息
exports.deleteAll = (req, res) => {
  Link.removeAll((err, data) => {
    if (err) {
      res.cc(err)
    } else {
      res.send({
        status: 0,
        message: '删除所有Link数据成功！',
      })
    }
  })
}