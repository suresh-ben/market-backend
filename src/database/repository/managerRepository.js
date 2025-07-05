const Manager = require('../models/ManagerModel');
const bcrypt = require('bcrypt');

async function createManager(name, userId, email, password, crountry_id, session) {
    try {
        const [manager] = await Manager.create([{
            name,
            userId,
            email,
            password,
            country: crountry_id
        }], { session })
        await manager.save();

        manager.password = undefined;
        return manager;
    } catch (error) {
        throw new Error('Unable to create manager. Please check if email already exists and try again.');
    }
}

async function verifyManagerCredentials(userId, password) {
    try {
        // get manager by userId and verify password
        const manager = await Manager.findOne({ userId });
        if (!manager) throw new Error('Manager not found');

        const isMatch = await bcrypt.compare(password, manager.password);
        if (!isMatch) throw new Error('Invalid credentials');
        
        // remove password from the result
        manager.password = undefined;

        // return manager without password
        return manager;
    } catch (error) {
        throw new Error(error.message || 'Error verifying manager credentials');
    }
}

async function getManagerByUserId(userId) {
    try {
        //get manager by userId, remove password from the result
        const manager = await Manager.findOne({ userId }).select('-password');
        if (!manager) throw new Error('Manager not found');

        return manager;
    } catch (error) {
        throw new Error(error.message || 'Error fetching manager by ID');
    }
}

async function verifyAndChangeManagerPassword(userId, oldPassword, newPassword) {
    try {
        // get manager by userId
        const manager = await getManagerByUserId(userId);
        if (!manager) throw new Error('Manager not found');

        // verify old password
        const isMatch = await bcrypt.compare(oldPassword, manager.password);
        if (!isMatch) throw new Error('Invalid old password');

        // hash new password
        const saltRounds = parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS) || 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // update password
        manager.password = hashedNewPassword;
        await manager.save();

        // remove password from the result
        manager.password = undefined;

        // return manager without password
        return manager;
    } catch (error) {
        throw new Error(error.message || 'Error changing manager password');
    }
}

module.exports = {
    createManager,
    verifyManagerCredentials,
    getManagerByUserId,
    verifyAndChangeManagerPassword
};