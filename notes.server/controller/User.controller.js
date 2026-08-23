const User = require("../models/User.model");
const generatetoken = require("../utils/token");
const bcrypt = require('bcrypt');

const createnewUser = async (req, res) => {
    try {
        const { Name, Email, Contact, Password } = req.body;

        if (!Name || !Email || !Contact || !Password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: 'User alerady exist' });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);

        const created = await User.create({
            Name, Email, Contact, Password: hashedPassword,
        });
        res.status(201).json({
            user: {
                _id: created._id,
                Name: created.Name,
                Email: created.Email,
                Contact: created.Contact
            },
            token: generatetoken(created._id)
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};


const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ message: 'Email and Password are required' })
        }

        const user = await User.findOne({ Email });
        if (!user) return res.status(401).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        res.status(200).json({
            user: {
                _id: user._id,
                Name: user.Name,
                Email: user.Email,
                Contact: user.Contact,
            },
            token: generatetoken(user._id),
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};


const getUser = async (req, res) => {
    try {
        const getAllUser = await User.find();

        return res.status(200).json(getAllUser);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(updated);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await User.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        return res.status(200).json(deleted);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createnewUser,
    login,
    getUser,
    updateUser,
    deleteUser
};
