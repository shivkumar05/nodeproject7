const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema({
    video: {
        type: String,
        require: true
    },
    thumb:{
        type:String,
        require: true
    },
    videoLength:{
        type:String
    },
    category:{
        type : Number,
        required:true
    },
    tag:{
        type : Number, 
        required:true
    }
    
}, { timestamps: true });

module.exports = mongoose.model("curriculum", curriculumSchema)