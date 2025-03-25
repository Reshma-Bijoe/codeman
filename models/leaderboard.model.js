const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
    problem: {
        type: Schema.Types.ObjectId,
        ref: 'problem',
        required: true,
    },
    time: {
        type: Number,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
});

module.exports = mongoose.model('leaderboard', leaderboardSchema);