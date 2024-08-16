import {AUTH_TOKEN, SET_CURRENT_USER} from './types/authTypes'
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
// import cartItems from './dummy-cart-items'
import {getProductsFromLocalStorage} from '../functions/localStorage'

// if getProductsFromLocalStorage() is empty then set cartItems as []
// check if window.localStorage is available
// if (window.localStorage) {
//     if (getProductsFromLocalStorage().length === 0) {
//         localStorage.setItem('cart', JSON.stringify(cartItems))
//     }
// }
let cartItems = []
// check if window is not undefined
if (typeof window !== 'undefined') {
    // check if localStorage is available
    if (window.localStorage) {
        // check if cart is not empty
        if (getProductsFromLocalStorage().length !== 0) {
            // check if cart is not empty
            cartItems = getProductsFromLocalStorage()
        } else {
            // set cartItems as []
            // localStorage.setItem('cart', JSON.stringify(cartItems))
            cartItems = []
        }
    }
}

export const initialState = {
    authToken: null,
    currentUser: null,
    cart: cartItems,
    amount: 0,
    discount: 0,
    subtotal: 0,
    total: 0,
    directCheckout: false,
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload ? action.payload : null,
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload ? action.payload : null,
            }
        case ADD_TO_CART:
            // check if product is already in cart
            const productInCart = state.cart.find(
                product => product.id === action.payload.id
            )
            // if product is already in cart
            if (productInCart) {
                // increase amount
                // return {
                //     ...state,
                //     cart: state.cart.map(product => {
                //         if (product.id === action.payload.id) {
                //             return {
                //                 ...product,
                //                 amount: product.amount + 1,
                //             }
                //         }
                //         return product
                //     }),
                // }
                // dont increase amount
                return {
                    ...state,
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload],
                }
            }
        case INCREASE_AMOUNT:
            let tempCart = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    return {...item, amount: item.amount + 1}
                }
                return item
            })
            return {...state, cart: tempCart}
        case DECREASE_AMOUNT:
            let tempCart2 = []
            if (action.payload.amount === 1) {
                tempCart2 = state.cart.filter(item => {
                    return item.id !== action.payload.id
                })
            } else {
                tempCart2 = state.cart.map(item => {
                    if (item.id === action.payload.id) {
                        return {...item, amount: item.amount - 1}
                    }
                    return item
                })
            }
            return {...state, cart: tempCart2}
        case CLEAR_CART:
            return {...state, cart: [], amount: 0, total: 0}
        case REMOVE_ITEM:
            const filteredItems = state.cart.filter(
                item => item.id !== action.payload
            )
            // console.log('filteredItems: ', filteredItems)
            return {...state, cart: filteredItems}
        case GET_TOTALS:
            let {total, amount, discount} = state.cart.reduce(
                (accomulator, item) => {
                    accomulator.total =
                        accomulator.total + item.price * item.amount
                    accomulator.amount += item.amount
                    accomulator.discount += item.discount * item.amount
                    return accomulator
                },
                {
                    total: 0,
                    amount: 0,
                    discount: 0,
                }
            )
            total = parseFloat(total.toFixed(2))
            return {...state, total, amount, discount}
        case DIRECT_CHECKOUT:
            return {...state, directCheckout: action.payload}
        default:
            return state
    }
}
