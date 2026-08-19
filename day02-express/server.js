const express = require("express");

const app = express();

app.use(express.json());

let port = 3000; 

app.get("/",(req,res)=>{
    res.send("Kaise ho meri dost.")
})

app.post("/",(req,res) => {

    console.log(req.body);

    res.send("Okk Done Boss");
    
})

app.listen(port,() => {
    console.log(`listen at ${port}`);
    
})