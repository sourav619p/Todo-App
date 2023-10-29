const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task : String,
    complete : Boolean
})

const TaskModel = mongoose.model("tasks",TaskSchema)

module.exports = TaskModel