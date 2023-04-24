const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const router = express.Router();
const Mark = require('../database/models/mark');

const { authToken } = require('./user');

router.get('/', async (req, res, next) => {
    try {
        const marks = await Mark.find({});
        if(!marks) throw new Error("No marks found");
        res.json(marks);
    } catch (error) {
        next(error);
    }
})

router.post('/add', authToken, async (req, res, next) => {
    try {
        const { latitude, longitude, title, description, rating, username } = req.body;
        const date = Date.now();
        const newMark = await Mark.create({ latitude, longitude, title, description, rating, username, date });
        res.json(newMark);
    } catch (error) {
        next(error)
    }
})

module.exports = router;