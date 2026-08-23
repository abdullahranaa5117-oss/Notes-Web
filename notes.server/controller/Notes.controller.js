const Notes = require("../models/Notes.model");


const createnewNotes = async (req, res) => {
  try {
    const { Title, Note, DueDate } = req.body;

    if (!Title || !Note || !DueDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const created = await Notes.create({
      Title,
      Note,
      DueDate,
      User: req.user.id

    });

    res.status(201).json(created);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const getAllNotes = await Notes.find({ User: req.user.id });

    return res.status(200).json(getAllNotes);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Notes.findOneAndUpdate(
      { _id: id, User: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Notes.findOneAndDelete({ _id: id, User: req.user.id });

    if (!deleted) {
      return res.status(404).json({
        message: "Note not found"
      });
    }


    return res.status(200).json(deleted);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createnewNotes,
  getNotes,
  updateNotes,
  deleteNotes
};
