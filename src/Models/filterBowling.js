const mongoose = require("mongoose")

const filterBowling = new mongoose.Schema({
    id:{
        type:Number
    },
    fast_bowling:{
        type:Number,
        require:true
    },
    leg_spin:{
        type:Number,
        require:true
    },
    off_spin:{
        type:Number,
        require:true
    },

    
}, { timestamps: true });

module.exports = mongoose.model("filterbowling", filterBowling)

