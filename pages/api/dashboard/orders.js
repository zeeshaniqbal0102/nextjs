import axios from 'axios'
require('dotenv').config()

// get all products from WP WooCommerce API with authendication
export default async function handler(req, res) {
    const {customer} = req.query
    let endpoint = `${process.env.WP_URL}/wp-json/wc/v3/orders?consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}&customer=${customer}`
    try {
        const response = await axios.get(endpoint)
        const orders = await response.data
        res.status(200).json({message: 'Success', data: orders})
    } catch (error) {
        res.status(400).json({
            message: 'There was an error in loading your orders',
            data: error,
        })
    }
}
