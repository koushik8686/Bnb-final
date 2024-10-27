const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    userid:String,
    messsages:[{
      message:String,
      sender:String,
      created_at: { type: Date, default: Date.now }
    }]
})

const messageModel = mongoose.model("messages",messageSchema)
module.exports = messageModel