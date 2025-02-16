require('dotenv').config();
const express = require('express');
const {connectDB} = require('./config/db');
const GetTasksRouter = require('./routes/route');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
connectDB();
app.use('/api/tasks' , GetTasksRouter);
app.listen(port , ()=>{
    console.log(`running server on port ${port}`);
})

