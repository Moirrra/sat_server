const db = require('../db/db.js')

// constructor
const Link = function (collection_id, from_id, to_id, color='#FF0000') {
  this.collection_id = collection_id
  this.from_id = from_id
  this.to_id = to_id
  this.color = color
}

Link.create = (newLink, result) => {
  db.query(`INSERT INTO link SET ?`,
  newLink, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      console.log(`created link: collection${newLink.collection_id}: from:${newLink.from_id} to:${newLink.to_id}` )
      result(null, res[0])
    })
}

Link.createMany = (linkList, result) => {
  db.query('INSERT INTO link (collection_id, from_id, to_id, color) VALUES ?',
  [linkList.map(item => [item.collection_id, item.from_id, item.to_id, item.color])], 
  (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      console.log(`created links` )
      result(null, res)
    })
}

Link.findById = (id, result) => {
  id = parseInt(id)
  db.query(`SELECT * FROM link WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log('found link: ', res[0])
      result(null, res[0])
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

Link.findByCollection = (id, result) => {
  id = parseInt(id)
  db.query(`SELECT * FROM link WHERE collection_id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log(`found link: ${res.length} in total`)
      result(null, res)
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

Link.findBySatellite = (id, result) => {
  id = parseInt(id)
  db.query(`SELECT * FROM link WHERE from_id = ${id} OR to_id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log(`found link: ${res.length} in total`)
      result(null, res)
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

Link.findAll = (result) => {
  db.query('SELECT * FROM link', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log(`found link: ${res.length} in total`)
    result(null, res)
  })
}

Link.removeById = (id, result) => {
  id = parseInt(id)
  db.query('DELETE FROM link WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found link: ', id)
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted link: ', id)
    result(null, res)
  })
}

Link.removeByCollection = (id, result) => {
  id = parseInt(id)
  db.query('DELETE FROM link WHERE collection_id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found link: ', id)
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted link: ', id)
    result(null, res)
  })
}

Link.removeBySatellite = (id, result) => {
  id = parseInt(id)
  db.query(`DELETE FROM link WHERE WHERE from_id = ${id} OR to_id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found link: ', id)
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted link: ', id)
    result(null, res)
  })
}

Link.removeByColSat = (collection_id, satellite_id, result) => {
  collection_id = parseInt(collection_id)
  satellite_id = parseInt(satellite_id)
  db.query(`DELETE FROM link WHERE collection_id = ${collection_id} AND (from_id = ${satellite_id} OR to_id = ${satellite_id}) `, 
  (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found link')
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted link ')
    result(null, res)
  })
}

Link.removeAll = (result) => {
  db.query('DELETE FROM link', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log(`deleted link: ${res.affectedRows} in total`)
    result(null, res)
  })
}

module.exports = Link