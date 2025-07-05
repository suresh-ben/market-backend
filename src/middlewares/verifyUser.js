const ownerRepository = require("../database/repository/ownerRepository");
const managerRepository = require("../database/repository/managerRepository");
const { verifyAccessToken, verifyRefreshToken } = require("../utils/authentication");
const { USER_ROLES } = require("../config/constants");

async function verifyOwnerRefreshToken(req, res, next) {
    try {
        // Get the refresh token from the cookies
        const refreshToken = req.cookies.ownerRefreshToken;
        if (!refreshToken) return res.status(402).json({ message: "Refresh token is required" });

        // Verify the refresh token
        const { userId, userType } = await verifyRefreshToken(refreshToken);
        if (userType !== USER_ROLES.OWNER) return res.status(402).json({ message: "Invalid user type" });

        // get the owner details from the database using the userId, and attach it to the request object
        const owner = await ownerRepository.getOwnerByUserId(userId);
        if (!owner) return res.status(402).json({ message: "Owner not found" });

        req.owner = owner;
        next();
    } catch (error) {
        console.error(error.message || "Refresh token verification failed:");
        return res.status(402).json({ message: error.message || "Unauthorized access" });
    }
}

async function verifyOwnerAccessToken(req, res, next) {
    try {
        // Get the access token from the request headers, usually in the Authorization header, Bearer
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (!accessToken) return res.status(401).json({ message: "Access token is required" });

        // Verify the access token
        const { userId, userType } = verifyAccessToken(accessToken);
        if (userType !== USER_ROLES.OWNER) return res.status(401).json({ message: "Invalid user type" });

        // get the owner details from the database using the userId, and attach it to the request object
        const owner = await ownerRepository.getOwnerByUserId(userId);
        if (!owner) return res.status(401).json({ message: "Owner not found" });

        req.owner = owner;
        next();
    } catch (error) {
        console.error("Access token verification failed:", error);
        return res.status(401).json({ message: "Unauthorized access" });
    }
}

async function verifyManagerRefreshToken(req, res, next) {
    try {
        // Get the refresh token from the cookies
        const refreshToken = req.cookies.managerRefreshToken;
        if (!refreshToken) return res.status(402).json({ message: "Refresh token is required" });

        // Verify the refresh token
        const { userId, userType } = await verifyRefreshToken(refreshToken);
        if (userType!== USER_ROLES.MANAGER) return res.status(402).json({ message: "Invalid user type" });

        // get the manager details from the database using the userId, and attach it to the request object
        const manager = await managerRepository.getManagerByUserId(userId);
        if (!manager) return res.status(402).json({ message: "Manager not found" });

        req.manager = manager;
        next();
    } catch (error) {
        console.error(error.message || "Refresh token verification failed:");
        return res.status(402).json({ message: error.message || "Unauthorized access" });
    }
}

async function verifyManagerAccessToken(req, res, next) {
    try {
        // Get the access token from the request headers, usually in the Authorization header, Bearer
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (!accessToken) return res.status(401).json({ message: "Access token is required" });

        // Verify the access token
        const { userId, userType } = verifyAccessToken(accessToken);
        if (userType!== USER_ROLES.MANAGER) return res.status(401).json({ message: "Invalid user type" });

        // get the manager details from the database using the userId, and attach it to the request object
        const manager = await managerRepository.getManagerByUserId(userId);
        if (!manager) return res.status(401).json({ message: "Manager not found" });

        req.manager = manager;
        next();
    } catch (error) {
        console.error("Access token verification failed:", error);
        return res.status(401).json({ message: "Unauthorized access" });
    }
}


module.exports = {
    verifyOwnerRefreshToken,
    verifyOwnerAccessToken,
    verifyManagerRefreshToken,
    verifyManagerAccessToken
};