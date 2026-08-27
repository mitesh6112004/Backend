const express = require("express");
const {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateSingleNoteController,
  deleteSingleNoteController,
} = require("../controllers/createNotesController");

const router = express.Router();

router.post("/create",createNotesController) ;
router.get("/allnotes", getAllNotesController);
router.get("/:id", getSingleNoteController);
router.put("/:id", updateSingleNoteController);
router.delete("/:id", deleteSingleNoteController);

module.exports = router ; 