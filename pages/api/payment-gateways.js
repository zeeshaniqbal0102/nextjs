import axios from 'axios'
require('dotenv').config()
export default async function handler(req, res) {
    let endpoint = `${process.env.WP_URL}/wp-json/wc/v3/payment_gateways?consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}&enabled=true`
    try {
        const response = await axios.get(endpoint)
        const methods = await response.data
        res.status(200).json({data: methods})
    } catch (error) {
        res.status(400).json(error)
    }
}
