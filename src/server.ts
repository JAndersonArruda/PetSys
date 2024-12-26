import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index'

dotenv.config();

const myPort = process.env.PORTSERVER;
const server = express();
server.use(express.json());

server.use('/', routes);

server.listen(myPort, () => {
    console.log(`Server is running at http://localhost:${myPort}`);
});