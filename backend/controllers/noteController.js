const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getAllNote = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, catagory } = req.body;
  const user_id = req.user._id;
  if (!title || !content || !catagory) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const createdNote = new Note({ user: user_id, title, content, catagory });
    await createdNote.save();
    res.status(201).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note_id = req.params.id;
  const note = await Note.findById(note_id);
  if (note) {
    res.status(201).json(note);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, catagory } = req.body;
  const note_id = req.params.id;
  const user_id = req.user._id;
  const note = await Note.findById(note_id);
  if (user_id.toString() !== note.user.toString()) {
    res.status(401);
    throw new Error("you can't perform this opration");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.catagory = catagory;
    await note.save();
    res.json(note);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const note = await Note.findById(req.params.id);

  //   console.log("user", req.user, "id", note)
  if (user_id.toString() !== note.user.toString()) {
    res.status(401);
    throw new Error("you can't perform this action");
  }
  if (note) {
    await Note.findByIdAndDelete(req.params.id);
    const notes =await Note.find({user: user_id})
    res.json(notes);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});
module.exports = {
  getAllNote,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};
