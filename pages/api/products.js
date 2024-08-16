import axios from 'axios'
require('dotenv').config()

// get all products from WP WooCommerce API with authendication
export default async function handler(req, res) {
    const {categoryId, searchTerm} = req.query
    let categoriesEndpoint = `${
        process.env.WP_URL
    }/wp-json/wc/v3/products?per_page=100&consumer_key=${
        process.env.WP_CONSUMER_KEY
    }&consumer_secret=${process.env.WP_CONSUMER_SECRET}&status=publish${
        categoryId != 'null' ? `&category=${categoryId}` : '' // if categoryId is not null, add categoryId to the query
    }`
    // if searchTerm is not null, add searchTerm to the query
    if (searchTerm != 'null' && searchTerm != undefined) {
        categoriesEndpoint = `${process.env.WP_URL}/wp-json/wc/v3/products?per_page=100&consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}&status=publish&search=${searchTerm}`
    }
    try {
        const response = await axios.get(categoriesEndpoint)
        const products = await response.data
        res.status(200).json({data: products})
    } catch (error) {
        res.status(400).json(error)
    }
}
