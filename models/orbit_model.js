const moment = require('moment')
const satelliteJS = require('satellite.js')
const julian = require('julian')

// constructor
const Orbit = function (id = 0, name = '', tle1 = '', tle2 = '') {
  this.id = id
  this.name = name
  this.tle1 = tle1
  this.tle2 = tle2
  this.satrec = satelliteJS.twoline2satrec(this.tle1, this.tle2)
}

// 返回CZML的第一个packet
Orbit.initCZML = (start, end) => {
  // 设置开始时间
  let startTime = moment(start.toISOString()).toISOString()
  // 设置结束时间
  let endTime = moment(end.toISOString()).toISOString()
  // 第一个packet代表Cesium场景
  let firstPacket = {
    "id": "document",
    "name": "CZML Point - Time Dynamic",
    "version": "1.0",
    "clock": {
      "interval": `${startTime}/${endTime}`, // 仿真时间
      "multiplier": 100, // 启动场景后的仿真倍速
      "range": "LOOP_STOP", // 达到终止时间后重新循环
      "step": "SYSTEM_CLOCK"
    }
  }
  return firstPacket
}

// 返回CZML的一个packet
Orbit.createOne = (orbit, start, end) => {
  // 设置开始时间
  let startTime = moment(start.toISOString()).toISOString()
  // 设置结束时间
  let endTime = moment(end.toISOString()).toISOString()

  // 间隔的分钟数
  let minsInDuration = (end.getTime() - start.getTime()) / 60000

  // 每天绕地旋转圈数
  //satrec.no：以弧度/分钟为单位的平均运动，一天有1440分钟，一弧度是0.159155圈
  let totalIntervalsInDay = orbit.satrec.no * 1440 * 0.159155

  // 运行一圈的分钟数
  let minsPerInterval = 1440 / totalIntervalsInDay
  let intervalTime = moment(start.toISOString()).toISOString()
  let leadIntervalArray = []
  let trailIntervalArray = []

  // 计算间隔
  // 倒序 避免最后一圈轨迹不完整
  for (let i = minsInDuration; i >= 0; i -= minsPerInterval) {
    // 最开始
    if (i <= minsPerInterval) {
      let curOrbitalInterval = {
        "interval": `${start.toISOString()}/${intervalTime}`,
        "epoch": `${start.toISOString()}`,
        "number": [0, minsPerInterval * 60, minsPerInterval * 60, 0]
      }
      let curTrail = {
        "interval": `${startTime}/${intervalTime}`,
        "epoch": `${startTime}`,
        "number": [0, 0, minsPerInterval * 60, minsPerInterval * 60]
      }
      leadIntervalArray.push(curOrbitalInterval)
      trailIntervalArray.push(curTrail)
    } else {
      let prevIntervalTime = moment(intervalTime).add(-minsPerInterval, 'm').toISOString()
      let curOrbitalInterval = {
        "interval": `${prevIntervalTime}/${intervalTime}`,
        "epoch": `${prevIntervalTime}`,
        "number": [0, minsPerInterval * 60, minsPerInterval * 60, 0]
      }
      let curTrail = {
        "interval": `${prevIntervalTime}/${intervalTime}`,
        "epoch": `${prevIntervalTime}`,
        "number": [0, 0, minsPerInterval * 60, minsPerInterval * 60]
      }
      intervalTime = moment(intervalTime).add(-minsPerInterval, 'm').toISOString()
      leadIntervalArray.push(curOrbitalInterval)
      trailIntervalArray.push(curTrail)
    }
  }

  // 计算位置
  // current time 和 epoch time 之间的秒数 原单位是毫秒
  let sec = (start - julian.toDate(orbit.satrec.jdsatepoch)) / 1000
  let pos = [] // 保存位置信息
  // 每60秒计算一个位置信息 获得一圈的位置
  for (let i = sec; i <= sec + minsInDuration * 60; i+=60) {
    // 计算当前卫星位置和速度
    let positionAndVelocity = satelliteJS.sgp4(orbit.satrec, i * 0.0166667) // 0.0166667min = 1sec
    // 地惯坐标系
    let positionEci = positionAndVelocity.position
    positionEci.x = positionEci.x * 1000
    positionEci.y = positionEci.y * 1000
    positionEci.z = positionEci.z * 1000
    pos.push(i - sec, positionEci.x, positionEci.y, positionEci.z)
  }

  // 设置packet
  let czmlPacket = {
    "id": `${orbit.id}`,
    "name": `${orbit.name}`,
    "availability": `${startTime}/${endTime}`, // 仿真时间
    "label": {
      "fillColor": {
        "rgba": [255, 0, 255, 255]
      },
      "font": "11pt Lucida Console",
      "horizontalOrigin": "LEFT",
      "outlineColor": {
        "rgba": [0, 0, 0, 255]
      },
      "outlineWidth": 2,
      "pixelOffset": {
        "cartesian2": [12, 0]
      },
      "show": true,
      "style": "FILL_AND_OUTLINE",
      "text": `${orbit.name}`,
      "verticalOrigin": "CENTER"
    },
    "path": { // 轨迹
      "show": [
        {
          "interval": `${startTime}/${endTime}`,
          "boolean": true
        }
      ],
      "width": 2,
      "material": {
        "solidColor": {
          "color": {
            "rgba": [
              // 随机生成轨道颜色
              Math.floor(255 * Math.random(0, 1)), 
              Math.floor(255 * Math.random(0, 1)), 
              Math.floor(255 * Math.random(0, 1)), 
              255
            ]
          }
        }
      },
      "resolution": 120,
      // 动画绘制前方的轨迹时间 减少
      "leadTime": leadIntervalArray,
      // 动画绘制出的轨迹时间 增加
      "trailTime": trailIntervalArray
    },
    "model": {
      "show": true,
      "gltf": "models/satellite.glb",
      "minimumPixelSize": 55,
    },
    "position": {
      // 采用拉格朗日插值法
      "interpolationAlgorithm": "LAGRANGE",
      // 1为线性插值，2为平方插值
      "interpolationDegree": 2,
      // 参考坐标系，地惯坐标系
      "referenceFrame": "INERTIAL",
      "epoch": `${startTime}`,
      "cartesian": pos // 卫星位置数据
    }
  }

  return czmlPacket
}

module.exports = Orbit