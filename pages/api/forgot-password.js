import axios from 'axios'
require('dotenv').config()
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).send({message: 'Only POST requests allowed', data: []})
        return
    } else {
        const {email} = req.body
        const endpoint = `https://www.project-name.com/api/forgot_password.php?login=${email}`
        try {
            const response = await axios.get(endpoint)
            const {code, msg} = await response.data
            if (code === '200') {
                res.status(200).send({message: msg, data: []})
            } else {
                res.status(400).send({message: msg, data: []})
            }
        } catch (error) {
            res.status(400).json({message: error, data: []})
        }
    }
}
