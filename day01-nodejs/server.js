let http = require("http");


let server = http.createServer((req,res)=> {
    res.end("Server is Running...")
})


server.listen(3000,()=> {
    console.log("server is running at port  number 3000.");
    
})
