const Orbit = require('../models/orbit_model.js')

exports.init = (req, res) => {
  if (!req.body) {
    res.cc('Content can not be empty!')
  } else {
    const orbit = new Orbit()
    const start = new Date(req.body.start)
    const end = new Date(req.body.end)
    const firstPacket = Orbit.initCZML(start, end)
    res.send({
      status: 0,
      message: '初始化轨道数据成功',
      data: firstPacket
    })
  }
}

exports.create = (req, res) => {
  if (!req.body) {
    res.cc('Content can not be empty!')
  }
  const start = new Date(req.body.start)
  const end = new Date(req.body.end)
  const sat = req.body.satellite
  const orbit = new Orbit(sat.id, sat.name, sat.tle1, sat.tle2)
  const packet = Orbit.createOne(orbit, start, end)
  res.send({
    status: 0,
    message: '创建该卫星轨道数据成功',
    data: packet
  })
}