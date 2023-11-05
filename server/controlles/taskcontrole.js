const mongoose= require('mongoose');
const taskModels =require('../models/taskmodel')
const stopModels=require('../models/stopsmodel');
//to create task
const createtask= async(req,res)=>{
    const {busno,busservice,from,to,stops,mapsrc}= req.body
    try{
        const task=await taskModels.create({
            busno,
            busservice,
            from,
            to,
            stops,
            mapsrc
        });
        res.status(200).json(task)
    }catch(e){
        res.status(400).json({erroe:e.message})
    }
};
//to get all task
const gettasks=async(req,res)=>{
    try{
    const tasks=await taskModels.find()
    res.status(200).json(tasks);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}
const getSingleTask=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message:"task not found"})
    }
    try{
    const singletask=await taskModels.findById({user:req.user.id,_id:id});
    res.status(200).json(singletask);
    }catch(e){
        res.status(400).json({error:e.message})
    }
}
// update task
const updateTask=async (req,res)=>{
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"Invalid task"})
    }
    
    try{
        const task=await taskModels.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                ...req.body,
            },

    )
    console.log(task)
    res.status(200).json(task)
    }catch(e){
        res.status(400).json({error:e.message})
    }
}

// delete a task

const deleteTask=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message:"invalid task"})
    }
    try{
    const task= await taskModels.findByIdAndDelete(id)
    res.status(200).json(task)
    }catch(e)
    {
        res.status(400).json({error:e.message})
    }
};
const addStop = async(req,res)=>{
    const {stop}=req.body;
    try{
        const stops = await stopModels.create({
            stop
        });
        res.status(200).json(stops);
    }catch(e){
        res.status(400).json(e);
    }
}
const filterbus = async (req, res) => {
    const { from, to, busservice } = req.body;
    const query = {};
  
    if (busservice) {
      query.busservice = busservice;
    }
  
    if (from && to) {
      query.stops = { $all: [from, to] };
    } else if (from) {
      query.stops = from;
    } else if (to) {
      query.stops = to;
    }
  
    try {
      const filteredBuses = await taskModels.find(query);
      res.status(200).json(filteredBuses);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
  


module.exports={createtask,gettasks,getSingleTask,updateTask,deleteTask,addStop,filterbus}