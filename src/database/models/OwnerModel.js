const mongoose = require('mongoose');
const { Schema } = mongoose;

const ownerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
});

// This middleware function is called before saving a owner document
// It ensures that the password is hashed before saving it to the database.
ownerSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const saltRounds = parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS) || 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

const Owner = mongoose.model('Owner', ownerSchema);
module.exports = Owner;

// This model represents an owner user in the system, with fields for name, email, and password.