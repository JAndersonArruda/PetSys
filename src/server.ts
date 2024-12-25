import express from "express";
import dotenv from "dotenv";
import { v4 as uuidV4 } from "uuid";

dotenv.config();

const myPort = process.env.PORTSERVER;
const server = express();
server.use(express.json());

server.listen(myPort, () => {
    console.log(`Server is running at http://localhost:${myPort}`);
});