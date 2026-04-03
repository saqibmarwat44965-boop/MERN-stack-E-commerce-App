import path from "path";
import dotenv from 'dotenv'
dotenv.config()

//   step 1 import express
import express from 'express'
import { PORT, PRI } from './config/config.js'
import productRoute from './routes/product.route.js'
import dbConnect from './database/dbconnect.js'
import morgan from 'morgan'
import cors from 'cors'
import UserRoute from './routes/user.route.js'
import cartRoutes from "./routes/cart.Routes.js";
//step 2 initialize express
const app = express()


//step 3.1  test route
app.get(PRI,(req,res) => {
    res.send("API is Up and runing")
})

//step 4 pass api in middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(`${PRI}/products`,productRoute)


app.use(`${PRI}/users`,UserRoute)




app.use(`${PRI}/cart`,cartRoutes);



app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



//step 3.2 start express server
const port = PORT  || 6500
app.listen(port, () =>{
    console.log(`express server is runing on----> http://localhost:${port}${PRI} `)
})

//step 5  mongodb connection ,calling mongodb function
dbConnect()