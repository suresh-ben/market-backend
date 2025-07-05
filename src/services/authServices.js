const ownerRepository = require('../database/repository/ownerRepository');
const managerRepository = require('../database/repository/managerRepository');
const sessionRepository = require('../database/repository/sessionRepository');
const { generateAccessToken, generateRefreshToken } = require('../utils/authentication');
const { USER_ROLES } = require('../config/constants');

// owner routes
async function handleOwnerLogin(userId, password) {
    try {
        // verify the user credentials
        const owner = await ownerRepository.verifyOwnerCredentials(userId, password);
        if (!owner) throw new Error('Invalid userId or password');

        // delete the previous session for the owner if it exists
        await sessionRepository.deleteSessionByUserId(owner.userId);

        // create a new session for the owner
        const session = await sessionRepository.createSession(USER_ROLES.OWNER, owner.userId);
        if (!session) throw new Error('Error creating session for owner');

        const ownerRefreshToken = generateRefreshToken(owner.userId, USER_ROLES.OWNER, session._id);
        const ownerAccessToken = generateAccessToken(owner.userId, USER_ROLES.OWNER);

        return { ownerAccessToken, ownerRefreshToken };
    } catch (error) {
        throw new Error(error.message || 'Error handling owner login');
    }
}

async function handleOwnerGenerateAccessToken(userId) {
    try {
        // generate a new access token for the owner
        const ownerAccessToken = generateAccessToken(userId, USER_ROLES.OWNER);

        return { ownerAccessToken };
    } catch (error) {
        throw new Error(error.message || 'Error handling owner generate access token');
    }
}

async function handleOwnerLogout(userId) {
    try {
        // delete the session for the owner
        await sessionRepository.deleteSessionByUserId(userId);

        return { message: 'Logout successful' };
    } catch (error) {
        throw new Error(error.message || 'Error handling owner logout');
    }
}

async function handleOwnerChangePassword(userId, oldPassword, newPassword) {
    try {
        // verify the old password
        await ownerRepository.verifyAndChangeOwnerPassword(userId, oldPassword, newPassword);

        return { message: 'Password changed successfully' };
    } catch (error) {
        throw new Error(error.message || 'Error handling owner change password');
    }
}

// manager routes
async function handleManagerLogin (userId, password) {
    try {
        // verify the user credentials
        const manager = await managerRepository.verifyManagerCredentials(userId, password);
        if (!manager) throw new Error('Invalid userId or password');

        // delete the previous session for the manager if it exists
        await sessionRepository.deleteSessionByUserId(manager.userId);

        // create a new session for the manager
        const session = await sessionRepository.createSession(USER_ROLES.MANAGER, manager.userId);
        if (!session) throw new Error('Error creating session for manager');

        const managerRefreshToken = generateRefreshToken(manager.userId, USER_ROLES.MANAGER, session._id);
        const managerAccessToken = generateAccessToken(manager.userId, USER_ROLES.MANAGER);

        return { managerRefreshToken, managerAccessToken };
    } catch (error) {
        throw new Error(error.message || 'Error handling manager login');
    }
}

async function handleManagerGenerateAccessToken (userId) {
    try {
        // generate a new access token for the manager
        const managerAccessToken = generateAccessToken(userId, USER_ROLES.MANAGER);

        return { managerAccessToken };
    } catch (error) {
        throw new Error(error.message || 'Error handling manager generate access token');
    }
}

async function handleManagerLogout (userId) {
    try {
        // delete the session for the manager
        await sessionRepository.deleteSessionByUserId(userId);

        return { message: 'Logout successful' };
    } catch (error) {
        throw new Error(error.message || 'Error handling manager logout');
    }
}

async function handleManagerChangePassword (userId, oldPassword, newPassword) {
    try {
        // verify the old password
        await managerRepository.verifyAndChangeManagerPassword(userId, oldPassword, newPassword);

        return { message: 'Password changed successfully' };
    } catch (error) {
        throw new Error(error.message || 'Error handling manager change password');
    }
}

module.exports = {
    handleOwnerLogin,
    handleOwnerGenerateAccessToken,
    handleOwnerLogout,
    handleOwnerChangePassword,
    handleManagerLogin,
    handleManagerGenerateAccessToken,
    handleManagerLogout,
    handleManagerChangePassword
};