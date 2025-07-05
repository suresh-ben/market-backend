const jwt = require('jsonwebtoken');
const { AUTH_TOKEN_TYPES } = require("../config/constants");
const sessionRepository = require('../database/repository/sessionRepository');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret_key';
const JWT_REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '1h';
const JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || '2m';

function generateRefreshToken(userId, userType, session_id) {
    return jwt.sign({ userId, userType, session_id, type: AUTH_TOKEN_TYPES.REFRESH }, JWT_SECRET_KEY, { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME });
}

async function verifyRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        if (decoded.type !== AUTH_TOKEN_TYPES.REFRESH) throw new Error('Invalid token type');

        // Check if the session_id is valid (this could be a database check)
        const session = await sessionRepository.getSessionById(decoded.session_id);
        if (!session) throw new Error('Invalid session');

        return {
            userId: decoded.userId,
            userType: decoded.userType,
            session_id: decoded.session_id
        };
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
}

function generateAccessToken(userId, userType) {
    return jwt.sign({ userId, userType, type: AUTH_TOKEN_TYPES.ACCESS }, JWT_SECRET_KEY, { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME });
}

function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        if (decoded.type !== AUTH_TOKEN_TYPES.ACCESS) throw new Error('Invalid token type');
        
        return {
            userId: decoded.userId,
            userType: decoded.userType
        };
    } catch (error) {
        throw new Error('Invalid or expired access token');
    }
}

module.exports = {
    generateRefreshToken,
    verifyRefreshToken,
    generateAccessToken,
    verifyAccessToken
};