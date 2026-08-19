const express = require("express");

const app = express();

app.use(express.json());

let users = [];

let port = 3000;

app.get("/user", (req, res) => {
  res.send(users);
});

app.post("/add", (req, res) => {
  let userData = req.body;

  users.push(userData) ; 
  
  res.send(users);
});

app.delete("/remove/:id",(req,res) => {
    let id = req.params.id; 

    users = users.filter((val) => id !== val.id);

    
    res.send(users);
    
})

app.put("/update/:id", (req,res) => {
   let { id } = req.params ; 
   let { name } = req.body ; 

   users = users.map((val) => val.id === id ? {...val, name} : val) ;

   res.send(users) ; 


})

app.listen(port, () => {
  console.log(`Server listen at ${port}`);
});
