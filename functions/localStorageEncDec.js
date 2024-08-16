import {createHash, scryptSync, randomBytes} from 'crypto'
// function to store product id in local storage for last viewed product
// Maximum storage capacity is 4 products
export const addToLastViewed = async (pId, pData) => {
    const lastViewed = JSON.parse(localStorage.getItem('lastViewed')) || []
    const productId = pId
    // check if product id is already in local storage then dont add it again
    const isAlready = lastViewed.find(p => {
        if (p && p.id == productId) {
            return p
        }
    })
    if (isAlready) {
        return
    } else {
        const product = pData
        const newLastViewed = [...lastViewed, product]
        if (newLastViewed.length > 4) {
            newLastViewed.shift()
        }
        localStorage.setItem('lastViewed', JSON.stringify(newLastViewed))
    }
}

// function to retrive all 4 products from local storage
export const getLastViewedProducts = () => {
    const lastViewed = JSON.parse(localStorage.getItem('lastViewed')) || []
    // const productIds = lastViewed.map(product => product.id)
    // return productIds
    return lastViewed
}

// function to store product data to local storage for cart/checkout feature

export const addProductToLocalStorage = pData => {
    if (typeof window !== 'undefined') {
        // first decrypt cart
        const decryptedCart = localStorage.getItem('cart')
            ? JSON.parse(decryptCart(localStorage.getItem('cart')))
            : []
        // const cart = JSON.parse(decryptedCart || [])
        // encrypt product data
        // const productId = pId
        // check if product id is already in local storage then dont add it again
        const isAlready = decryptedCart.find(p => {
            if (p && p.id == pData.id) {
                return p
            }
        })
        if (isAlready) {
            alert('This product in already in the cart')
            return
        } else {
            const product = pData
            // const newCart = [...cart, {pid: product.id, varientId: product.variationId}]
            const newCart = [...cart, product]
            // encrypt cart
            const {salt, hashedCart} = encryptCart(newCart)
            const cartToStore = {salt, hashedCart}
            localStorage.setItem('cart', JSON.stringify(cartToStore))
        }
    }
}

// function to retrive all products from local storage
export const getProductsFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        if (localStorage && localStorage.getItem('cart')) {
            // const ids = JSON.parse(localStorage.getItem('cart'))
            // ids &&
            //     ids.length > 0 &&
            //     ids.map((id, idx) => {
            //         console.log(id)
            //         // fetch product data from woocomerce api against id
            //     })
            // return ids
            return JSON.parse(decryptCart(localStorage.getItem('cart')))
        } else {
            return []
        }
        // const cart = JSON.parse(localStorage.getItem('cart')) || []
        // return cart
    }
}

// function to remove product from local storage
export const removeProductFromLocalStorage = pId => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const newCart = cart.filter(item => {
        return item.id !== pId
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
}

// function to increase product amount in local storage
export const increaseProductAmountInLocalStorage = pId => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const tempCart = cart.map(item => {
        if (item.id === pId) {
            return {...item, amount: item.amount + 1}
        }
        return item
    })
    localStorage.setItem('cart', JSON.stringify(tempCart))
}

// function to decrease product amount in local storage
export const decreaseProductAmountInLocalStorage = (pId, amount) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    let tempCart = []
    if (amount === 1) {
        tempCart = cart.filter(item => {
            return item.id !== pId
        })
    } else {
        tempCart = cart.map(item => {
            if (item.id === pId) {
                return {...item, amount: item.amount - 1}
            }
            return item
        })
    }
    localStorage.setItem('cart', JSON.stringify(tempCart))
}
// function to check if product is already in local storage
export const isProductInLocalStorage = pId => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const isAlready = cart.find(p => {
        if (p && p.id == pId) {
            return p
        }
    })
    return isAlready
}

export const encryptCart = cart => {
    // const hash = createHash('sha256').update(cart).digest('hex')
    const salt = randomBytes(32).toString('hex')
    const hashedCart = scryptSync(cart, salt, 64).toString('hex')
    return {
        salt,
        hashedCart,
    }
}

export const decryptCart = cart => {
    const {salt, hashedCart} = cart
    const decryptedCart = scryptSync(hashedCart, salt, 64).toString('hex')
    return decryptedCart
}
