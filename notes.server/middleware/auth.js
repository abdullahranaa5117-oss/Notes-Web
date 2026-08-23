const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: 'no token , authorizatioon denied' })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' })
    }

};

module.exports = { authenticate };