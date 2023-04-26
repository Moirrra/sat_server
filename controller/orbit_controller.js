const Orbit = require('../models/orbit_model.js')

export.init = (req, res) => {
  if (!req.body) {
    res.cc('Content can not be empty!')
  } else {
    const firstPacket = Orbit.createProp(req.body.start, req.body.end)
    res.send({
      status: 0,
      message: '初始化轨道数据成功',
      data: firstPacket
    })
  }
}

export.create = (req, res) => {
  if (!req.body) {
    res.cc('Content can not be empty!')
  }
  const orbit = new Orbit(req.body.satellite)
  const packet = Orbit.createOne(orbit, req.body.start, req.body.end)
  res.send({
    status: 0,
    message: '创建该卫星轨道数据成功',
    data: packet
  })
}