const Owner = require('../models/OwnerModel');
const bcrypt = require('bcrypt');

async function verifyOwnerCredentials(userId, password) {
    try {
        // get owner by userId and verify password
        const owner = await Owner.findOne({ userId });
        if (!owner) throw new Error('Owner not found');
        
        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) throw new Error('Invalid credentials');
        
        // remove password from the result
        owner.password = undefined;

        // return owner without password
        return owner;
    } catch (error) {
        throw new Error(error.message || 'Error verifying owner credentials');
    }
}

async function getOwnerByUserId(userId) {
    try {
        //get owner by userId, remove password from the result
        const owner = await Owner.findOne({ userId }).select('-password');
        if (!owner) throw new Error('Owner not found');
        
        return owner;
    } catch (error) {
        throw new Error(error.message || 'Error fetching owner by ID');
    }
}

async function verifyAndChangeOwnerPassword(userId, oldPassword, newPassword) {
    try {
        // get owner by userId
        const owner = await getOwnerByUserId(userId);
        if (!owner) throw new Error('Owner not found');

        // verify old password
        const isMatch = await bcrypt.compare(oldPassword, owner.password);
        if (!isMatch) throw new Error('Invalid old password');

        // hash new password
        const saltRounds = parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS) || 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // update password
        owner.password = hashedNewPassword;
        await owner.save();

        // remove password from the result
        owner.password = undefined;

        // return owner without password
        return owner;
    } catch (error) {
        throw new Error(error.message || 'Error changing owner password');
    }
}

module.exports = {
    verifyOwnerCredentials,
    getOwnerByUserId,
    verifyAndChangeOwnerPassword
};
