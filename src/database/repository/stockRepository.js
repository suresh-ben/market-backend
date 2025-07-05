const Stock = require('../models/Stock');

async function createStock(country_id, product_id) {
    try {
        //set the price and quantity as nulls
        const stock = await Stock.create({
            country: country_id,
            product: product_id,
        });
        stock.save;

        return stock;
    } catch (error) {
        console.error('Error creating stock:', error);
        throw new Error('Error creating stock');
    }
}

async function getAllStocksGroupedByCountry() {
    try {
        //group by country and populate product details
        const stocks = await Stock.aggregate([
            // Join product details
            {
                $lookup: {
                    from: 'products', // the MongoDB collection name (lowercase plural of model)
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product' // convert array to object
            },

            // Join country details (optional, remove if not needed in result)
            {
                $lookup: {
                    from: 'countries',
                    localField: 'country',
                    foreignField: '_id',
                    as: 'country'
                }
            },
            {
                $unwind: '$country'
            },

            // Group by country
            {
                $group: {
                    _id: '$country._id',
                    countryName: { $first: '$country.name' },
                    stocks: {
                        $push: {
                            productId: '$product._id',
                            name: '$product.name',
                            description: '$product.description',
                            quantity: '$quantity',
                            price: '$price'
                        }
                    }
                }
            },

            // Optional: sort countries by name
            {
                $sort: { countryName: 1 }
            }
        ]);

        return stocks;
    } catch (error) {
        throw new Error('Error fetching stocks grouped by country');
    }
}

async function getStockDetails(stock_id) {
    try {
        const stock = await Stock.findById(stock_id).populate('country').populate('product');
        if (!stock) throw new Error('Stock not found');
        
        return stock;
    } catch (error) {
        throw new Error('Error fetching stock details');
    }
}

async function getStockByCountryAndProduct(country_id, product_id) {
    try {
        const stock = await Stock.findOne({ country: country_id, product: product_id }).populate('country').populate('product');
        return stock;
    } catch (error) {
        throw new Error('Error fetching stock by country and product');
    }
}

async function getStocksByProduct(product_id) {
    try {
        const stocks = await Stock.find({ product: product_id }).populate('country');
        return stocks;
    } catch (error) {
        throw new Error('Error fetching stocks by product');
    }
}

async function updateStockDetails(stock_id, updatedQuantity, updatedPrice) {
    try {
        const stock = await Stock.findByIdAndUpdate(
            stock_id,
            { 
                quantity: updatedQuantity, 
                price: updatedPrice 
            },
            { new: true }
        );
        if (!stock) throw new Error('Stock not found');
        return stock;
    } catch (error) {
        throw new Error('Error updating stock details');
    }
}

module.exports = {
    createStock,
    getAllStocksGroupedByCountry,
    getStockDetails,
    getStockByCountryAndProduct,
    getStocksByProduct,
    updateStockDetails
};