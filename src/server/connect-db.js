import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017/dayOrganizer';
let db = null;

export async function connectedDB() {
    if ( db ) return db;
    let client = await MongoClient.connect(url, { useNewUrlParser: true }, );
    db = client.db();
    return db;
}
