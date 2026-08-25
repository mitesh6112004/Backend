const notesModel = require("../models/notes.model");

const createNotesController = async (req, res) => {
  try {
    let { title, description } = req.body;

    let newNote = await notesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "Note Create Succesfully",
      data: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    let allNotes = await notesModel.find();

    return res.send({
      message: "All Notes",
      data: allNotes,
    });
  } catch (error) {
    return res.json(500).json({
      message: "Not Found",
    });
  }
};

const getSingleNoteController = async (req,res) => {
  try {
      let noteId = req.params.id ; 

      let singleNote = await notesModel.findById(noteId);

      res.status(200).json({
        message : "Your Single Node is here",
        data : singleNote
      })


  } catch (error) {
    return res.status(500).json({
      message : "Internal Server error"
    })
  }
}

const updateSingleNoteController = async (req, res) => {
  try {
    let noteId = req.params.id;
    let body = req.body ;

    let updatedNote = await notesModel.findByIdAndUpdate(noteId, body, {new : true});

    res.status(200).json({
      message: "Your Note is updated",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

const deleteSingleNoteController = async (req, res) => {
  try {
    let noteId = req.params.id;
   

    let deleteNode = await notesModel.findByIdAndDelete(noteId,{
      new: true,
    });

    res.status(200).json({
      message: "Your Note is Delete",
      data: deleteNode,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

module.exports = {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateSingleNoteController,
  deleteSingleNoteController,
};