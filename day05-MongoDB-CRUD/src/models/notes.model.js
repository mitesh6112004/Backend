const mongoose = require("mongoose");

const notesSchmema = new mongoose.Schema({
    title : {
        type : String ,
        required: true, 
    },
    description : {
        type : String , 
        required : true, 
        minlength : [10, "Minimum 10 characters is required"]
    }
})

const notesModel = mongoose.model("notes", notesSchmema);
module.exports = notesModel ; 