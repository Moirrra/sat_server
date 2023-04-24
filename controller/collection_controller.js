const Collection = require('../models/collection_model.js')

exports.init = (newCollection) => {
  const collection = new Collection({ ...newCollection })
  Collection.create(collection, (err, data) => {
    if (err) {
      console.log(err.message)
    }
  })
}

exports.create = (req, res) => {
  if (!req.body) {
    res.cc('Content can not be empty!')
    return
  }
  const collection = new Collection({
    // collection_id: req.body.collection_id,
    name: req.body.collection_name,
  })
  Collection.create(collection, (err, data) => {
    if (err) {
      res.cc(err.message)
    } else {
      res.send({
        status: 0,
        message: '创建Collection成功！',
        data,
      })
    }
  })
}

// 根据Id查询一个Collection信息
exports.findOne = (req, res) => {
  req.query.id && Collection.findById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的Collection`)
      } else res.cc('获取Collection数据失败！')
    } else {
      res.send({
        status: 0,
        message: '获取collection数据成功！',
        data,
      })
    }
  })
}

// 查询所有Collection信息
exports.findAll = (req, res) => {
  Collection.findAll((err, data) => {
    if (err) {
      res.cc('获取Collection数据失败！')
    } else {
      res.send({
        status: 0,
        message: '获取Collection数据成功！',
        data,
      })
    }
  })
}

// 根据Id更新一个Collection信息
exports.update = (req, res) => {
  req.body && Collection.updateById(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.body.id}的Collection`)
      } else res.cc('更新Collection数据失败！')
    } else {
      res.send({
        status: 0,
        message: '更新Collection数据成功！',
      })
    }
  })
}

// 根据Id删除一个Collection信息
exports.delete = (req, res) => {
  req.query.id && Collection.removeById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.cc(`找不到id为${req.query.id}的Collection`)
      } else res.cc('删除Collection数据失败！')
    } else {
      res.send({
        status: 0,
        message: '删除Collection数据成功！',
      })
    }
  })
}

// 删除所有Collection信息
exports.deleteAll = (req, res) => {
  Collection.removeAll((err, data) => {
    if (err) {
      res.cc('删除所有Collection数据失败！')
    } else {
      res.send({
        status: 0,
        message: '删除所有Collection数据成功！',
      })
    }
  })
}