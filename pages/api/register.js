import axios from 'axios'
require('dotenv').config()
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).send({message: 'Only POST requests allowed', data: []})
        return
    } else {
        const body = req.body
        const endpoint = `${process.env.WP_URL}/wp-json/wc/v3/customers?consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}`
        try {
            const response = await axios.post(endpoint, body)
            const data = await response.data
            res.status(200).send({
                message: `You have been successfully registered with username: <strong>${data.username}</strong>`,
                data,
            })
        } catch (error) {
            let err = error.response.data
            let errorMessage = ''
            if (err.code === 'registration-error-email-exists') {
                errorMessage =
                    'An account is already registered with your email address. Please <a href="/login">login</a>'
            } else if (err.code === 'registration-error-email-invalid') {
                errorMessage = 'The email address is invalid.'
            } else if (err.code === 'registration-error-email-empty') {
                errorMessage = 'The email address is empty.'
            } else if (err.code === 'registration-error-username-exists') {
                errorMessage =
                    'An account is already registered with that username.'
            } else if (err.code === 'registration-error-username-invalid') {
                errorMessage = 'The username is invalid.'
            } else if (err.code === 'registration-error-username-empty') {
                errorMessage = 'The username is empty.'
            } else {
                errorMessage = 'Error'
            }
            res.status(400).json({message: errorMessage, data: err})
        }
    }
}
