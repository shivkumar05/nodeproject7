const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    category:{
        type : String, 
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model("category", categorySchema)