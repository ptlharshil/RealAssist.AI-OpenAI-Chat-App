const mongoose=require("mongoose");

const newChatSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        min:2,
        max:32
    },
    user:[String],
    
    messages:[String],
    
    time:[String]
    
})

const newChat=mongoose.model("newChat", newChatSchema);
module.exports=newChat;