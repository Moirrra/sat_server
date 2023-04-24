const db = require('../db/db.js')

// constructor
const Collection = function (collection) {
  this.id = collection.id
  this.name = collection.name
}

Collection.create = (newCollection, result) => {
  db.query("INSERT INTO collection SET name = ?", newCollection.name, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log('created collection: ', newCollection.name)
    console.log(res[0])
    result(null, res[0])
  })
}

Collection.findById = (id, result) => {
  id = parseInt(id)
  db.query(`SELECT * FROM collection WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log('found collection: ', res[0])
      result(null, res[0])
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

Collection.findAll = (result) => {
  db.query('SELECT * FROM collection', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log(`found collection: ${res.length} in total`)
    result(null, res)
  })
}

Collection.updateById = (collection, result) => {
  let id = parseInt(collection.id)
  db.query('UPDATE collection SET name = ? WHERE id = ?',
    [collection.name, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.affectedRows == 0) {
        console.log('not found collection: ', id)
        result({ kind: 'not_found' }, null)
        return
      }
      console.log('updated collection: ', id)
      result(null, { ...collection })
    })
}

Collection.removeById = (id, result) => {
  id = parseInt(id)
  db.query('DELETE FROM collection WHERE id ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      console.log('not found collection: ', id)
      result({ kind: 'not_found' }, null)
      return
    }
    console.log('deleted collection: ', id)
    result(null, res)
  })
}

Collection.removeAll = (result) => {
  db.query('DELETE FROM collection', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    console.log(`deleted collection ${res.affectedRows} in total`)
    result(null, res)
  })
}

module.exports = Collection