const Session = require("../models/Session");
const { USER_ROLES } = require("../../config/constants");

async function createSession(userType, userId) {
    try {
        const session = new Session({
            userType: userType,
            userId: userId
        });
        await session.save();

        return session;
    } catch (error) {
        throw new Error(`Error creating session: ${error.message || error}`);
    }
}

async function getSessionByUserId(userId) {
    try {
        const session = await Session.findOne({ userId: userId });
        if (!session) throw new Error("Session not found for the user");

        return session;
    } catch (error) {
        throw new Error(`Error getting session by userId: ${error.message || error}`);
    }
}

async function getSessionById(session_id) {
    try {
        const session = await Session.findById(session_id);

        return session;
    } catch (error) {
        throw new Error(`Error getting session by id: ${error.message || error}`);
    }
}

async function deleteSessionByUserId(userId) {
    try {
        //Only need to delete if it exists.
        const session = await Session.findOneAndDelete({ userId: userId });

        return session;
    } catch (error) {
        throw new Error(`Error deleting session: ${error.message || error}`);
    }
}

async function deleteSessionById(session_id) {
    try {
        //Only need to delete if it exists.
        const session = await Session.findByIdAndDelete(session_id);

        return session;
    } catch (error) {
        throw new Error(`Error deleting session by id: ${error.message || error}`);
    }
}

module.exports = {
    createSession,
    getSessionByUserId,
    deleteSessionByUserId,
    getSessionById,
    deleteSessionById
};