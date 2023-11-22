const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }

});

const TodoModel = mongoose.model("todos", TodosSchema);

module.exports = TodoModel