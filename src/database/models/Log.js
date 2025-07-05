const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
    action: { type: String, required: true }
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
