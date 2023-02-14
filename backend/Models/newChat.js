
const mongoose=require("mongoose");

const newChatSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        min:2,
        max:32
    },
    user:{
        type:String,
        min:2,
        default:"You"
    },
    
    messages:[String || Audio],
    
    time:[String]
    
})

const newChat=mongoose.model("newChat", newChatSchema);
module.exports=newChat;