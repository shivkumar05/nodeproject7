const mongoose = require("mongoose")

const filterBatting = new mongoose.Schema({
    id:{
        type:Number
    },
    backfoot:{
        type:Number,
        require:true
    },
    cover:{
        type:Number,
        require:true
    },
    flickshot:{
        type:Number,
        require:true
    },
    frontfoot:{
        type:Number,
        require:true
    },
    leaving_ball:{
        type:Number,
        require:true
    },
    on_drive:{
        type:Number,
        require:true
    },
    pullshot:{
        type:Number,
        require:true
    },
    square_cut:{
        type:Number,
        require:true
    },
    straight:{
        type:Number,
        require:true
    },
    sweepshot:{
        type:Number,
        require:true
    },

    
}, { timestamps: true });

module.exports = mongoose.model("filterBatting", filterBatting)

