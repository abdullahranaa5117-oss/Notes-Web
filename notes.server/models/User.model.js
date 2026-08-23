const mongoose = require('mongoose');
const { Schema, SchemaTypes, model } = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    Email: {
        type: SchemaTypes.String,
        required: true,
        unique:true
    },
    Contact: {
        type: SchemaTypes.String,
        required: true
    },
    Password: {
        type: SchemaTypes.String,
        required: true
    },
}, { timestamps: true });

const User = model('User', UserSchema);
module.exports = User;