const axios = require('axios')
const apiConfig = require('./config/api.config.js')
const satelliteController = require('./controller/satellite_controller.js')
const satelliteInfoController = require('./controller/satinfo_controller.js')

async function getSatellites(url) {
  console.log('Getting All Satellites ...')
  let res = await axios.get(url)
  let data = res.data
  for (const item of data) {
    let id = item['norad_cat_id']
    let name = item['tle0']
    if (name.indexOf('0 ') === 0) name = name.slice(2)
    let tle1 = item['tle1']
    let tle2 = item['tle2']
    let tle_updated = item['updated']
    if (id == "" || tle1 == null || tle2 == null) break
    satelliteController.init({ id, name, tle1, tle2, tle_updated })
  }
  console.log('更新卫星数据成功！')
}



async function getSatelliteInfo(url) {
  console.log('Getting Satellite Information ...')
  let res = await axios.get(url)
  let data = res.data
  for (const item of data) {
    let id = item['norad_cat_id']
    if (id === "") break
    let name = item['name']
    let status = item['status']
    let countries = item['countries']
    satelliteInfoController.init({ id, name, status, countries })
  }
  console.log('保存卫星信息成功！')
}

// getSatellites(apiConfig.tle_url)
// getSatelliteInfo(apiConfig.sat_url)

module.exports = {
  getSatellites,
  getSatelliteInfo
}




