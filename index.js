const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const TodoModel = require("./models/Todos");

app.use(cors());
app.use(express.json());
require('dotenv').config();

const apiBaseUrlServer = process.env.REACT_APP_API_BASE_URL_SERVER;

mongoose.connect(apiBaseUrlServer, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.post("/add/tasks", async (req, res) => {
    try {
        const task = req.body.task;
        const status = req.body.status;

        const tasks = new TodoModel({
            task: task,
            status: status

        });
        await tasks.save();
        res.status(200).send("Task added successfully!");
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("An error occurred while adding the task.");
    }
});

app.get('/get/tasks', async (req, res) => {
    try {
        const tasks = await TodoModel.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error getting tasks:', error);
        res.status(500).json({ error: 'An error occurred while getting tasks.' });
    }
});

app.put('/update/:id', async (req, res) => {
    const task = req.body.task;
    const status = req.body.status
    const id = req.params.id;
    try {
        const taskToUpdate = await TodoModel.findById(id);

        if (!taskToUpdate) {
            return res.status(404).send('tasks not found');
        }

        taskToUpdate.task = task;
        taskToUpdate.status = status;

        await taskToUpdate.save();

        res.status(200).send('Tasks updated successfully!');
    } catch (error) {
        console.error('Error editing tasks:', error);
        res.status(500).send('An error occurred while editing the tasks.');
    }
});

app.delete('/delete/:id', async (req, res) => {

    console.log("req", req.params.id)
    const id = req.params.id;
    try {
        await TodoModel.findByIdAndDelete(id).exec();
        res.status(200).send('Task deleted successfully!');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('An error occurred while deleting the task.');
    }
});

app.listen(3001, () => {
    console.log('you are connected')
})