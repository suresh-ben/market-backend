const mongoose = require('mongoose');
const managerRepository = require("../database/repository/managerRepository");
const countryRepository = require("../database/repository/countryRepository");

async function createManager(countryName, countryDescription, name, email, password, userId) {
    const session = await mongoose.startSession();
    try {
        // Start a transaction
        session.startTransaction();

        // create country
        const country = await countryRepository.createCountry(countryName, countryDescription, session);

        //create manager
        const manager = await managerRepository.createManager(name, userId, email, password, country._id, session);

        // commit the transaction
        await session.commitTransaction();
        session.endSession();

        //retuns
        return { country, manager };
    } catch (error) {
        if (session) await session.abortTransaction();
        throw new Error(error.message || 'Error fetching all stocks');
    }
}

module.exports = {
    createManager
};