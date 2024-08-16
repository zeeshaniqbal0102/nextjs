import React, {useContext, useEffect, useReducer} from 'react'
import {initialState, reducer} from './reducer'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {
    INCREASE_AMOUNT,
    DECREASE_AMOUNT,
    CLEAR_CART,
    REMOVE_ITEM,
    TOGGLE_AMOUNT,
    GET_TOTALS,
    DIRECT_CHECKOUT,
    ADD_TO_CART,
} from './types/cartTypes'
import {SET_CURRENT_USER, AUTH_TOKEN} from './types/authTypes'
import {
    addProductToLocalStorage,
    removeProductFromLocalStorage,
    increaseProductAmountInLocalStorage,
    decreaseProductAmountInLocalStorage,
} from '../functions/localStorage'
import {
    getAuthTokenFromLocalStorage,
    logout,
    getUserFromLocalStorage,
    decodeJWTToken,
    getAuthTokenFromCookie,
} from '../functions/general'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // Authendication
    const setAuthInContext = userData => {
        // getting mrAuthToken form Cookie and then assiging it to "authTokenFromLocal" variable
        // we can also get 'auth-token' from localStorage but for now we are using Cookie for sessions expires feature
        let authTokenFromLocal = getAuthTokenFromCookie()
        let userFromLocal = getUserFromLocalStorage()
        if (userFromLocal == null) {
            userFromLocal = userData ? userData : null
        }
        const userPayload = decodeJWTToken(authTokenFromLocal)
        let userId = userPayload ? userPayload.data.user.id : null
        dispatch({type: AUTH_TOKEN, payload: authTokenFromLocal})
        let userObj = {
            id: userId,
            ...userFromLocal,
        }
        dispatch({
            type: SET_CURRENT_USER,
            payload: userObj.id ? userObj : null,
        })
    }
    const logoutUser = () => {
        // let confirmLogout = window.confirm('Are you sure to get logged out?')
        // if (confirmLogout) {
        //     logout()
        //     window.location.reload()
        // }
        logout()
        window.location.reload()
        window.location.href = '/login'
    }
    // Cart actions starts here
    const addToCart = item => {
        addProductToLocalStorage(item)
        dispatch({type: ADD_TO_CART, payload: item})
    }
    const clearCart = () => {
        dispatch({type: CLEAR_CART})
    }
    const removeItem = id => {
        // console.log('removeItem id: ', id)
        removeProductFromLocalStorage(id)
        dispatch({type: REMOVE_ITEM, payload: id})
    }
    const increaseAmount = (id, amount) => {
        increaseProductAmountInLocalStorage(id, amount)
        dispatch({type: INCREASE_AMOUNT, payload: {id, amount}})
    }
    const decreaseAmount = (id, amount) => {
        decreaseProductAmountInLocalStorage(id, amount)
        dispatch({type: DECREASE_AMOUNT, payload: {id, amount}})
    }
    const directCheckout = boolean => {
        dispatch({type: DIRECT_CHECKOUT, payload: boolean})
    }
    // Cart actions ends here

    useEffect(() => {
        dispatch({type: GET_TOTALS})
    }, [state.cart, dispatch])

    useEffect(() => {
        setAuthInContext()
    }, [])

    return (
        <AppContext.Provider
            value={{
                ...state,
                clearCart,
                removeItem,
                increaseAmount,
                decreaseAmount,
                directCheckout,
                addToCart,
                setAuthInContext,
                logoutUser,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
// custom hook
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}
