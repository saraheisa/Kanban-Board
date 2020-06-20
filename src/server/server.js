import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { connectedDB } from './connect-db';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
    cors(),
    bodyParser.urlencoded( { extended: true } ),
    bodyParser.json()
);

export const addNewTask = async task => {
    const db = await connectedDB();
    const tasks = db.collection('tasks');
    await tasks.insertOne(task);
};

app.post('/task/new', (req, res) => {
    const task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
});

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
