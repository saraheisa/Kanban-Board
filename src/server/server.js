import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { connectedDB } from './connect-db';
import { authenticationRoot } from './authenticate';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
    cors(),
    bodyParser.urlencoded( { extended: true } ),
    bodyParser.json()
);

authenticationRoot(app);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.resolve(__dirname,'../../dist')));
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve('index.html'));
    });
}

export const addNewTask = async task => {
    const db = await connectedDB();
    const tasks = db.collection('tasks');
    await tasks.insertOne(task);
};

export const updateTask = async task => {

    const { id, name, group, isComplete } = task;

    const db = await connectedDB();
    const tasks = db.collection('tasks');
    
    if (name) {
        await tasks.updateOne({ id }, { $set: { name } });
    }

    if (group) {
        await tasks.updateOne({ id }, { $set: { group } });
    }

    if (isComplete !== undefined ) {
        await tasks.updateOne({ id }, { $set: { isComplete } });
    }

};

export const addNewComment = async comment => {
    const db = await connectedDB();
    const comments = db.collection('comments');
    await comments.insertOne(comment);
};

app.post('/task/new', async (req, res) => {
    const task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
});

app.post('/task/update', async (req, res) => {
    const task = req.body.task;
    await updateTask(task);
    res.status(200).send();
});

app.post('/comment/new', async (req, res) => {
    const comment = req.body.comment;
    await addNewComment(comment);
    res.status(200).send();
});

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
