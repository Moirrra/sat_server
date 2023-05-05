const db = require('../db/db.js')

// constructor
const SatelliteInfo = function (satellite) {
  this.id = satellite.id
  this.status = satellite.status
  this.countries = satellite.countries
}

SatelliteInfo.create = (newSatellite, result) => {
  db.query("INSERT INTO satellite_info SET ?", newSatellite, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log('created satellite_info: ', newSatellite.id)
    result(null, { ...newSatellite })
  })
}

SatelliteInfo.findById = (id, result) => {
  id = parseInt(id)
  db.query(`SELECT * FROM satellite_info WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log('found satellite_info: ', res[0])
      result(null, res[0])
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

SatelliteInfo.findAll = (result) => {
  db.query('SELECT * FROM satellite_info', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log('found satellite: ' + res.length + ' in total')
    result(null, res)
  })
}

SatelliteInfo.updateById = (satellite, result) => {
  let id = parseInt(satellite.id)
  db.query('UPDATE satellite_info SET status = ?, countries = ? WHERE id = ?',
    [satellite.status, satellite.countries, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.affectedRows == 0) {
        console.log('not found satellite_info: ', id)
        result({ kind: 'not_found' }, null)
        return
      }
      console.log('updated satellite_info: ', id)
      result(null, { ...satellite })
    })
}

SatelliteInfo.removeById = (id, result) => {
  id = parseInt(id)
  db.query('DELETE FROM satellite_info WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found satellite_info: ', id)
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted satellite_info: ', id)
    result(null, res)
  })
}

SatelliteInfo.removeAll = (result) => {
  db.query('DELETE FROM satellite_info', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log(`deleted satellite_info: ${res.affectedRows} + ' in total`)
    result(null, res)
  })
}

module.exports = SatelliteInfo