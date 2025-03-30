const express = require('express');
const router = express.Router();
const Submission = require('../models/submissions.model');


router.post('/add', async (req, res) => {
    try {
        const { problem, user, time, code } = req.body;
        if (!problem || !user) {
            return res.status(500).json({ success: false, msg: 'Problem / User is needed' });
        }
        const saveSub = await Submission.create({
            time,
            problem,
            user,
            code
        });
        return res.status(200).json({ success: true, data: saveSub });
    } catch (e) {
        return res.status(500).json({ success: false, msg: 'Error Posting Data', error: e });
    }
});

router.get('/get/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;
        const data = await Submission.find({ user: userid }).populate('problem').populate('user').lean().sort({ time: 1 }).exec();
        return res.status(200).json({ success: true, data });
    } catch (e) {
        return res.status(500).json({ success: false, msg: 'Error Fetching Data', error: e });
    }
});




module.exports = router;