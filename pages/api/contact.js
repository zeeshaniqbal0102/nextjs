import axios from 'axios'
require('dotenv').config()
// get all products from WP WooCommerce API with authendication
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).send({message: 'Only POST requests allowed', data: []})
        return
    } else {
        const body = req.body
        const endpoint =
            'https://www.project-name.com/wp-json/contact-form-7/v1/contact-forms/37510/feedback'
        try {
            const response = await axios.post(endpoint, body)
            const data = await response.data
            res.status(200).json({data: data})
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
