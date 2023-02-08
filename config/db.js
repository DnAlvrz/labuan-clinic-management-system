const mongoose = require('mongoose')

const mongo_uri = 'mongodb://127.0.0.1:27017/clinic'

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(mongo_uri)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDatabase;