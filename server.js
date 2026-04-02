const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));


// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const NoteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model("Note", NoteSchema);


// ➕ Add Note
app.post("/add", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.send("Note Added");
});

// 📄 Get Notes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// ❌ Delete Note
app.delete("/delete/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.send("Note Deleted");
});

// ✏️ Update Note
app.put("/update/:id", async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, req.body);
  res.send("Note Updated");
});

app.listen(3000, () => console.log("Server running on port 3000"));