let mongoose = require("mongoose");


let noteSchema = new mongoose.Schema({
    title : {type: "string", require : true},
    discription : {type : "string" , minlength : 10}
})

const NotesModel = mongoose.model("notes", noteSchema);
module.exports = NotesModel; 