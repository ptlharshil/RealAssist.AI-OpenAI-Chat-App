const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const chat=require("./Routes/chats")
const app=express()
app.use(bodyParser.json())
app.use(cors())
mongoose.set('strictQuery', true);
mongoose 
 .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
           })   
 .then(() => console.log("DB connected!"))
 .catch(err => console.log(err))
app.use("/chats", chat)
app.listen(process.env.PORT,()=>{
    console.log("Listening on port")
})
