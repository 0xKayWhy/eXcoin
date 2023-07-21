import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from 'cors'

import userController from "./controllers/userController.js"
import infoController from "./controllers/infoController.js"
import {responseList} from "./config/response-list.js";

dotenv.config()
const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongo connected"));

const PORT=process.env.PORT





server.use("/user", userController)
server.use("/", infoController)

server.all("*", (req, res) => {
    res.status(404).json({ message: responseList.NOT_FOUND})
})

server.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`)
})