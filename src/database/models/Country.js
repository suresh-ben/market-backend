const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountrySchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Country', CountrySchema);
