const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const stopModels =require('./stopsmodel');
const busSchema = new Schema(
    {
        busno:{
            type :String,
            require:true,
        },
        busservice:{
            type:String,
        },
        from:{
            type:String,
        },
        to:{
            type:String,
        },
        mapsrc:{
            type:String,
        },
        stops:[{
                type:String,
        }
        ]
    },
    {timestamps:true}
);

module.exports=mongoose.model("task",busSchema);