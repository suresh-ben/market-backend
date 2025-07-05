const Country = require('../models/Country');

async function createCountry(name, description, session) {
    try {
        const [country] = await Country.create(
            [{ name, description }],
        { session });
        await country.save();

        return country;
    } catch (error) {
        console.log('Error creating country:', error);
        throw new Error('Error creating country');
    }
}

async function getAllCountries() {
    try {
        const countries = await Country.find();
        return countries;
    } catch (error) {
        throw new Error('Error fetching all countries');
    }
}

module.exports = {
    createCountry,
    getAllCountries
};