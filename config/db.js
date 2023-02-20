const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const mongo_uri = 'mongodb://127.0.0.1:27017/clinic'
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(mongo_uri)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    const admin = await User.findOne({username: 'admin'})
    if(!admin) {
      const user = new User({
        schoolId: 'test-123',
        username:"admin",
        firstName:"super" ,
        middleName: "test",
        lastName: "admin",
        email:'admin@test.com'
      });
      const superAdmin = await User.register(user,process.env.ADMIN_PASSWORD || '123' );
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDatabase;