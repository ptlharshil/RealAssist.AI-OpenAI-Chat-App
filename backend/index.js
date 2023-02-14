const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const chat=require("./Routes/chats")
const app=express()
const {Configuration, OpenAIApi}=require("openai")
const router = require("express").Router();
const newChat = require("../backend/Models/newChat");
const token=process.env.API_TOKEN
const configuration=new Configuration({apiKey:token})
const openai=new OpenAIApi(configuration)
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
// app.use("/api", chat)

app.post("/api/newChat", async (req,res)=>{
    const chat=new newChat(req.body)
    try {
        const savedChat = await chat.save();
        res.status(200).json(savedChat);
      } catch (err) {
        res.status(500).json(err);
      }
})

app.post("/chat", async (req,res)=>{

    try{
        await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "You: Hey, this is Real Assist AI. How can I help you?\nFriend: Watching old movies.\nYou: Did you watch anything interesting?\nFriend: " + req.body.prompt,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
            stop: ["You:"],
        }).then((data)=>{
            res.status(200).json(data)
        })
    }catch(err){
        res.status(500).json(err)
    }
})

app.put("/editTitle/:id", async (req,res)=>{
    try{
        const updatedChat=await newChat.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if (!updatedChat) {
          return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json(updatedChat);
      } catch (err) {
        res.status(500).json(err);
      }
})

app.delete("/deleteChat/:id", async (req,res)=>{
    try {
        const chat = await newChat.findByIdAndDelete(req.params.id);
        if (!chat) {
          return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json({ message: 'Chat deleted successfully' });
      } catch (err) {
        res.status(500).json(err);
      }
})

app.get("/", async (req,res)=>{
    try {
       
        const chat=await newChat.find()
            res.status(200).json(chat);
      } catch (err) {
        res.status(500).json(err);
      }
})

app.listen(5000,()=>{
    console.log("Listening on port")
})
