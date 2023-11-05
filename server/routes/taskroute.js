const express=require('express');
const { createtask, gettasks, getSingleTask, updateTask, deleteTask, addStop, filterbus } = require('../controlles/taskcontrole');

const router=express.Router();

router.post('/',createtask);
router.get('/',gettasks);
router.get('/:id',getSingleTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);
router.post('/addstop',addStop);
router.post('/filter',filterbus);
module.exports=router;