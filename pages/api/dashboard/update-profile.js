import axios from 'axios'
require('dotenv').config()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {customer, data} = req.body
        let endpoint = `${process.env.WP_URL}/wp-json/wc/v3/customers/${customer}?consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}`
        try {
            const response = await axios.post(endpoint, data)
            const customerData = await response.data
            res.status(200).json({
                message: 'Profile updated successfuly',
                data: customerData,
            })
        } catch (error) {
            res.status(400).json({
                message: 'There was an error in updating profile',
                data: error,
            })
        }
    }
}
