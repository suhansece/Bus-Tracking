const express =require('express');

require('dotenv').config();

const app =express();

const mongoose =require('mongoose');

const tastroutes=require('./routes/taskroute');

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("s");
    });


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("listening at "+process.env.PORT);
        }); 
    })
    .catch((err)=>{
        console.log(err);
        console.log("DB connection error");
    });

app.use("/api/tasks",tastroutes);