const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionsSchema = new Schema({
    time: {
        type: Number,
        required: false,
    },
    problem: {
        type: Schema.Types.ObjectId,
        ref: 'problem',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    code: {
        type: String
    }
});

module.exports = mongoose.model('submission', submissionsSchema);