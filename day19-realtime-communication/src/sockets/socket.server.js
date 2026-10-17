import { Server } from "socket.io";

export default function initializeSocket(httpServer) {
    const io = new Server(httpServer); 

    io.on("connection", (socket) => {
      console.log("user is connected");

      socket.on("elon", (msg) => {
          console.log("Elon event is received this data : ", msg);
          io.emit("musk") ; 
      })

      socket.on("disconnect", () => {
        console.log("user is disconnect");
      });
    });
}