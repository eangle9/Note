const express = require("express");
const {
  getAllNote,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const protect = require("../middlewares/noteMiddleware");

const router = express.Router();

router.route("/").get(protect, getAllNote);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
