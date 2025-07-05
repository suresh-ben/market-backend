const authServices = require('../services/authServices');

// owner routes
async function handleOwnerLogin(req, res) {
    try {
        // get the user credentials from the request body: userId and password
        const { userId, password } = req.body;

        // pass the user credentials to the service layer for any business logic
        // This will set a cookie with the refresh token in the response
        // And will also return the access token in the response data
        // Will create a new session for the user if the userId and password are valid
        // Will delete the previous session if the userId and password are valid
        // If the userId and password are invalid, it will return an error message
        const { ownerAccessToken, ownerRefreshToken } = await authServices.handleOwnerLogin(userId, password);

        // set refresh token cookie in the response
        // send the access token in the response data
        res.cookie('ownerRefreshToken', ownerRefreshToken, { httpOnly: true, sameSite: 'None', secure: true }); // httpOnly to prevent client-side JavaScript from accessing the cookie
        res.status(200).json({ ownerAccessToken });
    } catch (error) {
        console.error('Error handling owner login:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleOwnerGenerateAccessToken(req, res) {
    try {
        // this request will be passed through the verifyRefreshToken middleware
        // which will verify the refresh token and set the userId in the request object under req.user
        // so we can access the userId from req.owner
        const { userId } = req.owner;

        // pass the userId to the service layer to handle the access token generation logic
        // This will generate a new access token for the user
        // If the userId is valid, it will return the access token in the response data
        const { ownerAccessToken } = await authServices.handleOwnerGenerateAccessToken(userId);
        res.status(200).json({ ownerAccessToken });
    } catch (error) {
        console.error('Error handling owner generate access token:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleOwnerLogout(req, res) {
    try {
        // this request will be passed through the verifyAccessToken middleware
        // which will verify the access token and set the userId in the request object under req.user
        // so we can access the userId from req.owner
        const { userId } = req.owner;

        //  pass the userId to the service layer to handle the logout logic
        // This will delete the session for the user
        // And also remove the refresh token cookie from the response
        // If the userId is valid, it will return a success message in the response data
        const response = await authServices.handleOwnerLogout(userId);

        // remove the refresh token cookie from the response
        res.clearCookie('ownerRefreshToken', { httpOnly: true, path: '/' });
        res.status(200).json(response);
    } catch (error) {
        console.error('Error handling owner logout:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleOwnerChangePassword(req, res) {
    try {
        // get the userId, oldPassword, newPassword from the request object
        const { userId } = req.owner;
        const { oldPassword, newPassword } = req.body;

        // pass the userId, oldPassword, newPassword to the service layer to handle the change password logic
        // This will verify the old password and update the password to the new password
        const response = await authServices.handleOwnerChangePassword(userId, oldPassword, newPassword);

        res.status(200).json(response);
    } catch (error) {
        console.error('Error handling owner change password:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleGetOwnerDetails(req, res) {
    try {
        const owner = req.owner;

        res.status(200).json({ owner });
    } catch (error) {
        console.error('Error fetching owner details:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

// manager routes
async function handleManagerLogin(req, res) {
    try {
        // get the user credentials from the request body: userId and password
        const { userId, password } = req.body;

        // pass the user credentials to the service layer for any business logic
        // This will set a cookie with the refresh token in the response
        // And will also return the access token in the response data
        // Will create a new session for the user if the userId and password are valid
        // Will delete the previous session if the userId and password are valid
        // If the userId and password are invalid, it will return an error message
        const { managerRefreshToken, managerAccessToken } = await authServices.handleManagerLogin(userId, password);

        // set refresh token cookie in the response
        // send the access token in the response data
        res.cookie('managerRefreshToken', managerRefreshToken, { httpOnly: true }); // httpOnly to prevent client-side JavaScript from accessing the cookie
        res.status(200).json({ managerAccessToken });
    } catch (error) {
        console.error('Error handling manager login:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleManagerGenerateAccessToken(req, res) {
    try {
        // this request will be passed through the verifyRefreshToken middleware
        // which will verify the refresh token and set the userId in the request object under req.user
        // so we can access the userId from req.manager
        const { userId } = req.manager;

        // pass the userId to the service layer to handle the access token generation logic
        // This will generate a new access token for the user
        // If the userId is valid, it will return the access token in the response data
        const { managerAccessToken } = await authServices.handleManagerGenerateAccessToken(userId);
        res.status(200).json({ managerAccessToken });
    } catch (error) {
        console.error('Error handling manager generate access token:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleManagerLogout(req, res) {
    try {
        // this request will be passed through the verifyAccessToken middleware
        // which will verify the access token and set the userId in the request object under req.user
        // so we can access the userId from req.manager
        const { userId } = req.manager;

        //  pass the userId to the service layer to handle the logout logic
        // This will delete the session for the user
        // And also remove the refresh token cookie from the response
        // If the userId is valid, it will return a success message in the response data
        const response = await authServices.handleManagerLogout(userId);

        // remove the refresh token cookie from the response
        res.clearCookie('managerRefreshToken', { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).json(response);
    } catch (error) {
        console.error('Error handling manager logout:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleManagerChangePassword(req, res) {
    try {
        // get the userId, oldPassword, newPassword from the request object
        const { userId } = req.manager;
        const { oldPassword, newPassword } = req.body;

        // pass the userId, oldPassword, newPassword to the service layer to handle the change password logic
        // This will verify the old password and update the password to the new password
        const response = await authServices.handleManagerChangePassword(userId, oldPassword, newPassword);

        res.status(200).json(response);
    } catch (error) {
        console.error('Error handling manager change password:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function handleGetManagerDetails(req, res) {
    try {
        const manager = req.manager;

        res.status(200).json({ manager });
    } catch (error) {
        console.error('Error handling manager change password:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

module.exports = {
    handleOwnerLogin,
    handleOwnerGenerateAccessToken,
    handleOwnerLogout,
    handleOwnerChangePassword,
    handleGetOwnerDetails,
    handleManagerLogin,
    handleManagerGenerateAccessToken,
    handleManagerLogout,
    handleManagerChangePassword,
    handleGetManagerDetails
};
