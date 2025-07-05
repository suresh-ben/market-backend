const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, "Connection Error"));
    db.once('open', () => console.log("Connected to MongoDB"));
}

module.exports = {
    connectToDB
}