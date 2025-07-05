const Product = require('../models/Product');

async function createProduct(name, description) {
    try {
        const product = new Product({
            name: name,
            description: description
        });
        await product.save();
        return product;
    } catch (error) {
        throw new Error('Error creating product');
    }
}

async function getAllProducts() {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        throw new Error('Error fetching all products');
    }
}

module.exports = {
    createProduct,
    getAllProducts
};