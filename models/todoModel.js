const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
  },
  deadLine: {
    type: Date,
    required: true,
  },
});

const Todo = mongoose.model("todoModel", todoSchema);
Todo.newID = () => new mongoose.Types.ObjectId();
module.exports = Todo;
