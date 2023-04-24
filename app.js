// 导入 express 模块
const express = require('express')
// 创建 express 服务器实例
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// 路由之前封装错误消息回应res.cc
app.use((req, res, next) => {
  // status默认值为1，表示失败
  // err可能是一个错误对象，也可能是一个字符串
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    });
  }
  next();
})


// 导入并注册路由模块
const satelliteRouter = require('./router/satellite_router')
const collectionRouter = require('./router/collection_router')
const assignmentRouter = require('./router/assignment_router')
app.use('/api/satellite', satelliteRouter)
app.use('/api/collection', collectionRouter)
app.use('/api/assignment', assignmentRouter)


app.listen(8888, function () {
  console.log('server is running at http://127.0.0.1:8888');
})

