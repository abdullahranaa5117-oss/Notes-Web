const mongoose = require('mongoose');
const { Schema, SchemaTypes, model } = require("mongoose");

const NotesSchema = new mongoose.Schema({
    Title: {
        type: SchemaTypes.String,
        required: true
    },
    Note: {
        type: SchemaTypes.String,
        required: true
    },
    DueDate: {
        type: SchemaTypes.Date,
        required: true
    },
    User: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Notes = model('Notes', NotesSchema);
module.exports = Notes;