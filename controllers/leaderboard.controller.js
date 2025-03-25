const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const LeaderBoard = require('../models/leaderboard.model');


router.get('/getbyproblem/:problemId', async (req, res) => {
    try {
        const problemId = req.params.problemId;
        const data = await LeaderBoard.findOne({ problem: problemId }).populate('problem').populate('author').lean().exec();
        if (!data) {
            return res.status(500).json({ success: false, msg: 'Error Fetching Data' });
        }
        return res.status(200).json({ success: true, data });
    } catch (e) {
        return res.status(500).json({ success: false, msg: 'Error Fetching Data', error: e });
    }
});

router.get('/getbyproblem', async (req, res) => {
    try {
        const data = await LeaderBoard.find().populate('problem').populate('author').lean().exec();
        if (!data) {
            return res.status(500).json({ success: false, msg: 'Error Fetching Data' });
        }
        return res.status(200).json({ success: true, data });
    } catch (e) {
        return res.status(500).json({ success: false, msg: 'Error Fetching Data', error: e });
    }
});

router.post('/postleaderdata', async (req, res) => {
    try {
        const problemId = req.body.problemId;
        const userId = req.body.userId;
        const frontEndTime = req.body.newtime;
        const payload = {
            problem: problemId,
            time: frontEndTime,
            author: userId,
        }
        const savedLeader = await LeaderBoard.create(payload);
        return res.status(200).json({ success: true, data: savedLeader });
    } catch (e) {
        return res.status(500).json({ success: false, msg: 'Error Posting Data', error: e });
    }
});

module.exports = router;