const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const stopSchema = new Schema(
        {
            stop:{
                type:String,
                require:true,
                unique:true
            }, 
        }
    );

module.exports=mongoose.model("stop",stopSchema);