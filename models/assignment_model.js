const db = require('../db/db.js')

// constructor
const Assignment = function (collection_id, satellite_id) {
  this.collection_id = collection_id
  this.satellite_id = satellite_id
}

Assignment.create = (newAssignment, result) => {
  db.query(`INSERT INTO assignment SET ?`,
    newAssignment, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      console.log(`created assignment: ${newAssignment.collection_id}-${newAssignment.satellite_id}`)
      result(null, { ...newAssignment })
    })
}

Assignment.findById = (id, result) => {
  id = parseInt(id)
  db.query(`SELECT * FROM assignment WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log('found assignment: ', res[0])
      result(null, res[0])
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

Assignment.findByCollection = (id, result) => {
  id = parseInt(id)
  db.query(`SELECT * FROM assignment WHERE collection_id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log(`found assignment: ${res.length} in total`)
      result(null, res)
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

Assignment.findBySatellite = (id, result) => {
  id = parseInt(id)
  db.query(`SELECT * FROM assignment WHERE satellite_id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log(`found assignment: ${res.length} in total`)
      result(null, res)
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

Assignment.findAll = (result) => {
  db.query('SELECT * FROM assignment', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log(`found assignment: ${res.length} in total`)
    result(null, res)
  })
}

Assignment.removeById = (id, result) => {
  id = parseInt(id)
  db.query('DELETE FROM assignment WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found assignment: ', id)
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted assignment: ', id)
    result(null, res)
  })
}

Assignment.removeByCollection = (id, result) => {
  id = parseInt(id)
  db.query('DELETE FROM assignment WHERE collection_id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found assignment: ', id)
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted assignment: ', id)
    result(null, res)
  })
}

Assignment.removeBySatellite = (id, result) => {
  id = parseInt(id)
  db.query('DELETE FROM assignment WHERE satellite_id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found assignment: ', id)
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted assignment: ', id)
    result(null, res)
  })
}

Assignment.removeAll = (result) => {
  db.query('DELETE FROM assignment', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log(`deleted assignment: ${res.affectedRows} in total`)
    result(null, res)
  })
}

module.exports = Assignment