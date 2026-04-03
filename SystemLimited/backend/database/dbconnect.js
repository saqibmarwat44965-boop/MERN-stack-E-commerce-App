import mongoose from 'mongoose'
import { MONGODB_CLOUD_URI } from '../config/config.js'


const dbConnect = () =>{
  mongoose.connect(
    MONGODB_CLOUD_URI
  )
  .then(conn =>console.log(`mongodb is connected 
    with express by using${conn.connection.host}`))
    .catch(err => console.log(`mongodb connection
         failed b/c ${err.message}`))
}

export default dbConnect