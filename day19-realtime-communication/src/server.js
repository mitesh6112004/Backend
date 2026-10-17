import app from "./app/app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import initializeSocket from "./sockets/socket.server.js";


const httpServer = createServer(app) ;
initializeSocket(httpServer);



httpServer.listen(3000 , () => {
    console.log("Server is running at port 3000");
    
})