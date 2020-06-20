import { defaultState } from './defaultState';
import { connectedDB } from './connect-db';

async function initializeDB() {
    let db = await connectedDB();
    for (const collectionName in defaultState) {
        let collection = db.collection(collectionName);
        await collection.deleteMany();
        await collection.insertMany(defaultState[collectionName]);
    }
}

initializeDB();
