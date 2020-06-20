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

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
