import express from "express";
import { getNotes, getNoteById, addNote } from "../db/notes.js";

const router = express.Router();

// Get all notes
router.get("/", (req, res) => {
  res.json(getNotes());
});

// Get a single note by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = getNoteById(id);

  if (!note) {
    return res.status(404).send("Note not found");
  }

  res.json(note);
});

// Create a new note
router.post("/", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request must have a body.");
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).send("New note must have text.");
  }

  const newNote = addNote(text);
  res.status(201).json(newNote);
});

export default router;
