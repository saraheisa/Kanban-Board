import { addNewTask, updateTask } from './server';

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
})();
