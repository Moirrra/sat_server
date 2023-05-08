const db = require('./db/db.js')
// const dbConfig = require('./config/db.config.js')

// function createDB(dbName) {
//   db.query(`CREATE DATABASE ${dbName}`,(err, res) => {
//     if(err) throw err
//     console.log('Database created ...')
//   })
// }


function createSatelliteTable() {
  console.log('createSatelliteTable')
  db.query(`CREATE TABLE satellite (
    id INT NOT NULL, 
    name VARCHAR(50) NOT NULL,
    tle1 VARCHAR(70) NOT NULL,
    tle2 VARCHAR(70) NOT NULL,
    tle_updated VARCHAR(40),
    PRIMARY KEY (id),
    )`,
    (err, res) => {
      if (err) {
        console.log(err)
        throw err
      }
      console.log('satellite表已经建立')
    }
  )
}

function createSatelliteInfoTable() {
  console.log('createSatelliteTable')
  db.query(`CREATE TABLE satellite_info (
    id INT NOT NULL, 
    status VARCHAR(10),
    countries VARCHAR(10),
    PRIMARY KEY (id)
    )`,
    (err, res) => {
      if (err) {
        console.log(err)
        throw err
      }
      console.log('satellite_info表已经建立')
    }
  )
}


function createCollectionTable() {
  db.query(`CREATE TABLE collection (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL, 
    PRIMARY KEY (id))`,
    (err, res) => {
      if (err) {
        console.log(err)
        throw err
      }
      console.log('collection表已经建立')
    }
  )
}

function createAssignmentTable() {
  db.query(`CREATE TABLE assignment (
    id INT NOT NULL AUTO_INCREMENT,
    collection_id INT NOT NULL,
    satellite_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (collection_id) REFERENCES collection (id),
    FOREIGN KEY (satellite_id) REFERENCES satellite (id))`,
    (err, res) => {
      if (err) {
        console.log(err)
        throw err
      }
      console.log('assignment表已经建立')
    }
  )
}

function createLinkTable() {
  db.query(`CREATE TABLE link (
    id INT NOT NULL AUTO_INCREMENT,
    collection_id INT NOT NULL,
    from_id INT NOT NULL,
    to_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (collection_id) REFERENCES collection (id),
    FOREIGN KEY (from_id) REFERENCES satellite (id),
    FOREIGN KEY (to_id) REFERENCES satellite (id))`,
    (err, res) => {
      if (err) {
        console.log(err)
        throw err
      }
      console.log('link表已经建立')
    }
  )
}

function initDefaultData() {
  db.query("INSERT INTO collection SET name = 'default'", (err, res) => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log('默认数据已初始化')
    process.exit()
  }
  )
}

console.log('Database tables created ...')
// createSatelliteTable()
// createSatelliteInfoTable()
// createCollectionTable()
// createAssignmentTable()
createLinkTable()
// initDefaultData()
