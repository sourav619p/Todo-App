const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TaskModel = require('./models/Task')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/todo')

app.get('/get',(req,res) => {
    TaskModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res) => {
    const {id} = req.params;
    const complete = req.body.complete;
    TaskModel.findByIdAndUpdate({_id: id},{complete: complete})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/edit/:id',(req,res)=>{
    const {id} = req.params;
    const task = req.body.task;
    TaskModel.findByIdAndUpdate({_id: id},{task: task})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id',(req,res) => {
    const {id} = req.params;
    TaskModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add',(req,res) => {
    const task = req.body.task;
    // const complete = req.body.complete === true ? true : false;
    console.log(req.body,"----data")
    TaskModel.create({
        task : task,
        complete : false
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server listening on port 3001");
})