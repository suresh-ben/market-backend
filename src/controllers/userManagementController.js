const userManagementServices = require('../services/userManagementServices');

async function handleCreateManager(req, res) {
    try {
        const { countryName, countryDescription, name, email, password, userId } = req.body;
        const { manager, country } = await userManagementServices.createManager(countryName, countryDescription, name, email, password, userId);
        res.json({ manager, country });
    } catch (error) {
        console.error('Error creating manager:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

module.exports = {
    handleCreateManager,
};