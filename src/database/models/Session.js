const mongoose = require('mongoose');
const { Schema } = mongoose;
const { USER_ROLES } = require("../../config/constants")

const sessionSchema = new Schema({
    userType: {
        type: String,
        enum: Object.values(USER_ROLES),
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
