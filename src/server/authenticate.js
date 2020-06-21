import md5 from 'md5'
import uuid from 'uuid';
import { connectedDB } from './connect-db';

const authenticationTokens = [];

export const getUser = async username => {
    const db = await connectedDB();
    const users = db.collection('users');
    const user = await users.findOne({ name: username });
    return user;
}

export const checkPassword = (password, correctPassword) => {
    return md5(password) === correctPassword;
}

export const assembleUserState = async user => {
    const db = await connectedDB();
    const tasks = await db.collection('tasks').find({'owner': user.id}).toArray();
    const groups = await db.collection('groups').find({'owner': user.id}).toArray();
    const session = {authenticated:`AUTHENTICATED`,id:user.id};
    const users = { id: user.id, name: user.name, friends: user.friends };
    const comments = await db.collection('comments').find({}).toArray();
    return {
        tasks,
        groups,
        session,
        users,
        comments
    };
}

export const authenticationRoot = (app) => {
    app.post('/authenticate', async (req, res) => {
        const { username, password } = req.body;
        const user = await getUser(username);
        
        if (!user) {
            res.status(500).send('user not found');
        }
        
        if (!checkPassword(password, user.passwordHash)) {
            res.status(500).send('Password incorrect');
        }

        let token = uuid();

        authenticationTokens.push({
            token,
            userId: user.id
        });

        let state = await assembleUserState(user);

        res.status(200).send({ token, state });
    });
}
