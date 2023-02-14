const {Configuration, OpenAIApi}=require("openai")
const router = require("express").Router();
const newChat = require("../Models/newChat.js");
const token=process.env.API_TOKEN
const configuration=new Configuration({apiKey:token})
const openai=new OpenAIApi(configuration)

router.post("/chats", async (req,res)=>{
    const chat=new newChat(req.body)
    try {
        const savedChat = await chat.save();
        res.status(200).json(savedChat);
      } catch (err) {
        res.status(500).json(err);
      }
})

router.post("/chat", async (req,res)=>{

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

router.put("editTitle", (req,res)=>{
    try{
        newChat.findOneAndUpdate()//check before implementing by console log
    }catch(err){
        res.send(500).json(err)
    }
})

router.delete("/deleteChat", (req,res)=>{
    try{
        newChat.deleteOne(req.body)//check before implementing by console log
    }catch(err){
        res.send(500).json(err)
    }
})

router.get("/", async (req,res)=>{
    try {
        const chat = await newChat.findOne(req.body.title);
        res.status(200).json(chat);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;
