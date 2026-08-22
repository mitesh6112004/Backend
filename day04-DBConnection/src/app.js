const express = require("express");
const ConnectDB = require("./config/db");
const NotesModel = require("./models/note.model")

const app = express();

app.use(express.json());

ConnectDB();

app.get("/",(req,res)=> {
    res.send("Done");
})

app.post("/create", async (req,res)=> {
    let {title , discription} = req.body ; 

    const newNote = await NotesModel.create({
        title,
        discription
    })

    res.send({
        success : true , 
        message: "Note Add Succesully", 
        data : newNote

    }
      
    )

})





module.exports = app; 