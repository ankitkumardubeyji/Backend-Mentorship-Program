import dotenv from "dotenv"

import app from "./app.js"

import {connectDb} from "./db/index.js"

// dotenv : 

dotenv.config({
    path:"../.env"
})



const port = process.env.PORT 


        
connectDb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Sever successfully started at the localhost ${process.env.PORT} `)
    })
})
.catch((err)=>{
    console.log("Some error occured in starting the server "+err)
})
 







