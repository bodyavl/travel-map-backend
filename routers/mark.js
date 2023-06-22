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
        const newMark = await Mark.create({ latitude, longitude, title, description, rating, username });
        res.json(newMark);
    } catch (error) {
        next(error)
    }
})

router.patch('/update/:id', authToken, async (req, res, next) => {
    try {
        const { id }  = req.params
        const updatedMaker = req.body;
        const marker = await Mark.findByIdAndUpdate(id, { ...updatedMaker }, { new: true })
        res.json(marker);
    } catch (error) {
        next(error)
    }
})

router.delete('/delete/:id', authToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const marker = await Mark.findByIdAndDelete(id);
        res.json(marker);
    } catch (error) {
        next(error);
    }

})

module.exports = router;