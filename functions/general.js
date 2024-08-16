import cookie from 'cookie'
import jwt from 'jsonwebtoken'

// functiont to get cookies from Request Headers
export const parseCookies = req => {
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}
// function to get auth-token from local storage
export const getAuthTokenFromLocalStorage = () => {
    let authToken = localStorage.getItem('mrAuthToken')
    if (authToken) return authToken
    return null
}
// function to get mrAuthToken from cookie with js
export const getAuthTokenFromCookie = () => {
    if (typeof window !== 'undefined') {
        const cookies = parseCookies()
        return cookies['mrAuthToken']
    }
    return null
}
// function to get auth-token from cookie or local storage
export const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        const authToken = getAuthTokenFromCookie()
        if (authToken) return authToken
        return getAuthTokenFromLocalStorage()
    }
    return null
}

// logout function
export const logout = () => {
    localStorage.removeItem('mrAuthToken')
    localStorage.removeItem('user')
    document.cookie = `mrAuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
// function to get User details from Local Storage
export const getUserFromLocalStorage = () => {
    let user = localStorage.getItem('user')
    if (user) return JSON.parse(user)
    return null
}
// function to convert ISO Date to String
export const isoDateToDateString = isoDate => {
    return new Date(isoDate).toDateString()
}

// function to verify JWT Token
export const verifyJWTToken = token => {
    if (!token) return null
    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
        return decoded
    } catch (err) {
        return null
    }
}

// function to get Decode JWT Token
export const decodeJWTToken = token => {
    if (!token) return null
    try {
        let decoded = jwt.decode(token, {complete: true})
        return decoded ? decoded.payload : null
    } catch (err) {
        return null
    }
}
