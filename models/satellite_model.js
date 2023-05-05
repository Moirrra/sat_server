const db = require('../db/db.js')

// constructor
const Satellite = function (satellite) {
  this.id = satellite.id
  this.name = satellite.name
  this.tle1 = satellite.tle1
  this.tle2 = satellite.tle2
  this.tle_updated = satellite.tle_updated
}

Satellite.create = (newSatellite, result) => {
  db.query("INSERT INTO satellite SET ?", newSatellite, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log('created satellite: ', newSatellite.id)
    result(null, { ...newSatellite })
  })
}

Satellite.findById = (id, result) => {
  id = parseInt(id)
  db.query(`SELECT * FROM satellite WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log('found satellite: ', res[0])
      result(null, res[0])
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

Satellite.findAll = (result) => {
  db.query('SELECT * FROM satellite', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log('found satellite: ' + res.length + ' in total')
    result(null, res)
  })
}

Satellite.findByIdList = (idList, result) => {
  db.query('SELECT * FROM satellite WHERE id IN (?)', [idList], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log('found satellite: ' + res.length + ' in total')
    result(null, res)
  })
}

Satellite.updateById = (satellite, result) => {
  let id = parseInt(satellite.id)
  db.query('UPDATE satellite SET name = ?, tle1 = ?, tle2 = ?, tle_updated = ? WHERE id = ?',
    [satellite.name, satellite.tle1, satellite.tle2, satellite.tle_updated, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.affectedRows == 0) {
        console.log('not found satellite: ', id)
        result({ kind: 'not_found' }, null)
        return
      }
      console.log('updated satellite: ', id)
      result(null, { ...satellite })
    })
}

Satellite.removeById = (id, result) => {
  id = parseInt(id)
  db.query('DELETE FROM satellite WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found satellite: ', id)
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted satellite: ', id)
    result(null, res)
  })
}

Satellite.removeAll = (result) => {
  db.query('DELETE FROM satellite', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log(`deleted satellite: ${res.affectedRows} + ' in total`)
    result(null, res)
  })
}

module.exports = Satellite
