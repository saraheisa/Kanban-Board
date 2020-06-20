import { addNewTask, updateTask } from './server';
import { getUser, checkPassword, assembleUserState } from './authenticate';
import { connectedDB } from './connect-db'

(async function testServer() {
    await addNewTask({
        "name": "Finish React Course",
        "id": "123",
        "group": "G2",
        "owner": "U1",
        "isComplete": false
    });

    await updateTask({
        "id": "T4",
        "name": "Finish React Tutorial"
    });

    console.log(await getUser('Dev'));
    
    console.log(checkPassword('TUPLES', '587403fa995a20b45d168a518df367f4'));

    const db = await connectedDB();
    const users = db.collection('users');
    const user = await users.findOne({ name: 'Dev' });
    console.log( await assembleUserState(user));
})();
