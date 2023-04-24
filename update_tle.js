const axios = require('axios')
const apiConfig = require('./config/api.config.js')
const satelliteController = require('./controller/satellite_controller.js')

async function getLatestSatellites(url) {
  console.log('Getting All Satellite information ......')
  let res = await axios.get(url)
  let data = res.data
  for (const item of data) {
    let id = item['norad_cat_id']
    let name = item['tle0']
    if (name.indexOf('0 ') === 0) name = name.slice(2)
    let tle1 = item['tle1']
    let tle2 = item['tle2']
    let tle_updated = item['updated']
    satelliteController.init({id, name, tle1, tle2, tle_updated})
  }
  console.log('更新卫星数据成功！')
}

// async function getSatellites(url) {
//   console.log('Getting Satellite information ......')
//   let res = await axios.get(url)
//   let data = res.data
//   for (const item of data) {
//     let norad_cat_id = item['norad_cat_id']
//     if (norad_cat_id === "") break
//     let name = item['name']
//     let status = item['status']
//     let launched = item['launched']
//     let decayed = item['decayed']
//     let updated = item['updated']
//     let countries = item['countries']
//     const sql = `insert ignore into satellite values(?,?,?,?,?,?,?)`
//     db.query(sql, [norad_cat_id, name, status, launched, decayed, updated, countries], (err, results) => {
//       if (err) throw(err)
//       // if (results.affectedRows !== 1) console.log('插入数据库失败！')
//     })
//   }
//   console.log('保存卫星信息成功！')
// }

getLatestSatellites(apiConfig.tle_url)
// getSatellites(apiConfig.sat_url)
// process.exit()




