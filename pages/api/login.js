import axios from 'axios'
require('dotenv').config()
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).send({message: 'Only POST requests allowed', data: []})
        return
    } else {
        const body = req.body
        const endpoint = `https://www.project-name.com/wp-json/jwt-auth/v1/token`
        try {
            const response = await axios.post(endpoint, body)
            const data = await response.data
            if (data.token) {
                res.status(200).send({message: 'Success', data: data})
            } else {
                res.status(403).send({message: 'Error', data: data})
            }
        } catch (error) {
            // console.log('error', error.response.data.code)
            if (error.response.data.code == '[jwt_auth] incorrect_password') {
                let dataToSend = {
                    ...error.response.data,
                    message: `<strong>Error</strong>: The password you entered for <strong>${body.username}</strong> is incorrect. <a href="/forgot-password/">Lost your password?</a>`,
                }
                res.status(403).send({
                    message: error.response.data.message,
                    data: dataToSend,
                })
                return
            }
            res.status(403).json({message: error, data: error.response.data})
        }
    }
}
