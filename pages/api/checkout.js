import axios from 'axios'
require('dotenv').config()
// get all products from WP WooCommerce API with authendication
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).send({message: 'Only POST requests allowed', data: []})
        return
    } else {
        const body = req.body
        res.status(200).send({message: 'Success', data: body})
    }
}
