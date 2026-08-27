const express = require("express");
const ConnectDB = require("./config/db");
const notesModel = require("./models/notes.model");
const createNotesController = require("./controllers/createNotesController");
const notesRoute = require("./routes/notes.route");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
    origin : "http://localhost:5173"
}));

ConnectDB();

app.get("/", (req,res) => {
    res.send("Ok Done.")
})

app.use("/notes", notesRoute) ; 

module.exports = app ; 