import absoluteUrl from 'next-absolute-url'
import {
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILURE,
    CLEAR_ERRORS,
} from '../constants/productTypes'

// api call to /api/products getAllProducts with dispatch
export const getAllProducts = req => async dispatch => {
    try {
        const {origin} = absoluteUrl(req)
        const {data} = await axios.get(`${origin}/api/products`)
        // dispatch({
        //     type: ALL_PRODUCTS_SUCCESS,
        //     payload: data,
        // })
        console.log('getAllProducts: ', data)
    } catch (error) {
        // dispatch({
        //     type: ALL_PRODUCTS_FAILURE,
        //     payload: error,
        // })
        console.log('Error: ', error)
    }
}

// clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    }
}
