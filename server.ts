import { UserRouter } from './Routes/UserRoute';
import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = 3000

async function main() {

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    await mongoose.connect("mongodb://localhost:27017/chat", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    app.use("/user", UserRouter)

    app.listen(port, () => {
        console.log("running")
    })    
}

main()
