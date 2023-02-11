
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
    content:{
        messages:{type:String || Audio},
        time:{type:Date}
    }
})

const newChat=mongoose.model("newChat", newChatSchema);
module.exports=newChat;