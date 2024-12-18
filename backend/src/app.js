import express from "express"

import cookieParser from "cookie-parser"

import cors from "cors"  


// midddlewares

const app = express()

app.use(express.json({limit:"16kb"}))


app.use(express.urlencoded({extended:"true", limit:"16kb"}))


app.use(express.static("public"))


app.use(cookieParser())


// creating the server 

 export default  app


