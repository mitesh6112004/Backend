const express = require("express"); 
const app = express();
const userRoute = require("./routes/user.routes.js"); 
const cors = require("cors");

app.use(express.json()) ;

app.use(cors({
    origin : "http://localhost:5173"
}))

app.get("/", (req,res) => {
    res.send("Hello Done.")
})

app.use("/user", userRoute); 

module.exports = app ; 