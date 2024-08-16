import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import Layout from '../../../components/Layout'
import {Col, Container, Row} from 'react-bootstrap'
import productStyles from './Product.module.css'
import contentStyles from '../../../components/Products/Content.module.css'
import Link from 'next/link'
import {useRouter} from 'next/router'
import axios from 'axios'
// require('dotenv').config()
import {
    addToLastViewed,
    getLastViewedProducts,
    addProductToWishlist,
    isProductInWishlist,
} from '../../../functions/localStorage'
import {useGlobalContext} from '../../../contextAPI/context'
import {NotificationContainer} from 'react-notifications'
import {createNotification} from '../../../functions/utils'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import {IconButton} from '@material-ui/core'

function Product({id, data, variations}) {
    const {state, directCheckout, addToCart} = useGlobalContext()
    const [lastViewedProducts, setLastViewedProducts] = useState([])
    const [favorite, setFavorite] = useState(
        typeof window !== 'undefined' ? isProductInWishlist(id) : false
    )
    // const [configrationOptions, setConfigrationOptions] = useState([])
    // const [variationsState, setVariationsState] = useState([])
    const [variationDetails, setVariationDetails] = useState({
        id: '',
        title: '',
        variation: '',
        price: '',
        regular_price: '',
        amount: 1,
        shipsByDate: '',
        discount: 0,
        isOnSale: false,
        sale_price: '',
        isInCart: false,
        // isInWishlist: false,
        isInStock: true,
        isFreeShipping: false,
    })
    const [variationStockStatus, setVariationStockStatus] = useState(null)
    const [points, setPoints] = useState(null)
    const router = useRouter()
    // const {id} = router.query

    useEffect(() => {
        setLastViewedProducts(getLastViewedProducts())
        addToLastViewed(id, data)
        setFavorite(isProductInWishlist(id))
        // debugging
        // console.log('Id', id)
        // console.log('Data', data)
        // console.log('Variations', variations)
    }, [id])

    const handleVariationChange = (
        varId,
        varLabel,
        varPrice,
        varRegularPrice,
        isVarOnSale,
        varSalePrice,
        varStockStatus,
        meta
    ) => {
        setVariationDetails({
            ...variationDetails,
            id: varId,
            variation: varLabel,
            price: varPrice,
            regular_price: varRegularPrice,
            isOnSale: isVarOnSale,
            sale_price: varSalePrice,
        })
        setVariationStockStatus(varStockStatus)
        setPoints(meta.find(item => item.key == '_ywpo_preorder_price').value)
        // console.log('Points', points)
        // console.log('Variation Id', varId)
    }
    const handleAddToCart = btn => {
        // if user click on quick buy
        if (btn == 'quickBuy') {
            directCheckout(true)
        }
        // check if product is a type of variation
        if (data.type == 'variable') {
            // check if variations are available
            if (variations && variations.length > 0) {
                // check if variation is selected
                if (variationDetails.id == '') {
                    // alert('Please select a variation')
                    createNotification('warning', 'Please select a variation')
                    return
                }
                // check if variation is in stock
                if (variationStockStatus == 'outofstock') {
                    // alert('This variation is out of stock')
                    createNotification(
                        'error',
                        'This variation is out of stock'
                    )
                    return
                }
                // this variation is in stock and can be added to cart
                // setting up object to pass to state
                // calculate discount
                const discount =
                    variationDetails.isOnSale &&
                    variationDetails.sale_price - variationDetails.price > 0
                        ? variationDetails.sale_price - variationDetails.price
                        : 0
                const newItem = {
                    id: data.id,
                    title: data.name,
                    variation: variationDetails.variation,
                    variationId: variationDetails.id,
                    price: variationDetails.price,
                    amount: 1,
                    shipsByDate: '',
                    discount: discount,
                    isInCart: true,
                    // isInWishlist: false,
                    isInStock: true,
                    // isFreeShipping: false,
                    img: data.images[0].src,
                }
                // add to cart
                addToCart(newItem)
                if (btn == 'quickBuy') {
                    router.push('/checkout')
                }
            } else {
                // no variations available for this product so add to cart as a simple product
                // setting up object to pass to state
                // calculate discount
                const discount =
                    data.on_sale && data.sale_price - data.price > 0
                        ? data.sale_price - data.price
                        : 0
                const newItem = {
                    id: data.id,
                    title: data.name,
                    variation: '',
                    variationId: '',
                    price: data.price,
                    amount: 1,
                    shipsByDate: '',
                    discount: discount,
                    isInCart: true,
                    // isInWishlist: false,
                    isInStock: true,
                    // isFreeShipping: false,
                    img: data.images[0].src,
                }
                // add to cart
                addToCart(newItem)
                if (btn == 'quickBuy') {
                    router.push('/checkout')
                }
            }
        } else {
            // this product is not a type of variation so add to cart as a simple product
            // check if product is in stock
            if (data.stock_status == 'instock') {
                // setting up object to pass to state
                // calculate discount
                const discount =
                    data.on_sale && data.sale_price - data.price > 0
                        ? data.sale_price - data.price
                        : 0
                const newItem = {
                    id: data.id,
                    title: data.name,
                    variation: '',
                    variationId: '',
                    price: data.price,
                    amount: 1,
                    shipsByDate: '',
                    discount: discount,
                    isInCart: true,
                    // isInWishlist: false,
                    isInStock: true,
                    // isFreeShipping: false,
                    img: data.images[0].src,
                }
                // add to cart
                addToCart(newItem)
                if (btn == 'quickBuy') {
                    router.push('/checkout')
                }
            } else {
                // alert('This product is out of stock')
                createNotification('error', 'This product is out of stock')
                return
            }
        }
    }

    // useEffect(() => {
    //     if (data) {
    //         const {attributes, variations} = data
    //         const configrations = attributes.find(attribute => {
    //             return (
    //                 attribute.name == 'Configuration' ||
    //                 attribute.name == 'configuration'
    //             )
    //         })
    //         if (configrations) {
    //             setConfigrationOptions(configrations.options)
    //         }
    //     }
    // }, [id])

    // function to handle add to wishlist
    const handleFavourite = () => {
        setFavorite(!favorite)
        addProductToWishlist(id, data, !favorite)
    }

    return (
        <Layout>
            {data ? (
                <section className={productStyles.product}>
                    <Container>
                        <Row className={productStyles.row1}>
                            <Col xs={12} md={6}>
                                {data.images && data.images.length > 0 ? (
                                    <Image
                                        src={data.images[0].src}
                                        alt={data.name}
                                        width={850}
                                        height={535}
                                    />
                                ) : (
                                    <Image
                                        src='/images/products/image-1.png'
                                        alt='Image 1'
                                        width={850}
                                        height={535}
                                    />
                                )}
                            </Col>
                            <Col
                                xs={12}
                                md={6}
                                className={productStyles.infoCol}
                            >
                                <Row className='d-flex align-items-center mt-2 mb-5'>
                                    <Col sm={8}>
                                        <h2
                                            className={
                                                productStyles.productTitle
                                            }
                                        >
                                            {data.name
                                                ? data.name
                                                : 'Product Name'}
                                        </h2>
                                    </Col>
                                    <Col sm={4}>
                                        <IconButton onClick={handleFavourite}>
                                            {favorite ? (
                                                <FavoriteIcon
                                                    style={{
                                                        fill: 'var(--clr-accent-2)',
                                                    }}
                                                    titleAccess='Remove from wishlist'
                                                />
                                            ) : (
                                                <FavoriteBorderIcon titleAccess='Add to wishlist' />
                                            )}
                                        </IconButton>
                                    </Col>
                                </Row>
                                <div
                                    className={
                                        productStyles.configurationWrapper
                                    }
                                >
                                    <p className={productStyles.configuration}>
                                        Configuration:
                                    </p>
                                    {/* 4 radio inputs */}
                                    <div
                                        className={`${productStyles.radio} mrRadios`}
                                    >
                                        {variations &&
                                            variations.length > 0 &&
                                            variations.map(
                                                (variation, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className='form-check'
                                                        >
                                                            <input
                                                                type='radio'
                                                                className='form-check-input'
                                                                name='exampleRadios'
                                                                id={
                                                                    variation.id
                                                                }
                                                                value={
                                                                    variation.id
                                                                }
                                                                onChange={() =>
                                                                    handleVariationChange(
                                                                        variation.id,
                                                                        variation
                                                                            .attributes[0]
                                                                            .option,
                                                                        variation.price,
                                                                        variation.regular_price,
                                                                        variation.on_sale,
                                                                        variation.sale_price,
                                                                        variation.stock_status,
                                                                        variation.meta_data
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                className='form-check-label'
                                                                htmlFor={
                                                                    variation.id
                                                                }
                                                            >
                                                                {
                                                                    variation
                                                                        .attributes[0]
                                                                        .option
                                                                }{' '}
                                                                - $
                                                                {
                                                                    variation.price
                                                                }
                                                            </label>
                                                        </div>
                                                    )
                                                }
                                            )}
                                    </div>
                                </div>
                                <div>
                                    {variationStockStatus !== null &&
                                        (variationStockStatus ==
                                        'outofstock' ? (
                                            <p
                                                className={
                                                    productStyles.outOfStock
                                                }
                                            >
                                                Out of Stock
                                            </p>
                                        ) : (
                                            <p
                                                className={
                                                    productStyles.inStock
                                                }
                                            >
                                                In Stock
                                            </p>
                                        ))}
                                </div>
                                <div
                                    className={`${productStyles.shipsBy} displayNoneAtMobile`}
                                >
                                    <p>
                                        <strong>Ships by: </strong>
                                        <span>24-02-2022</span>
                                    </p>
                                </div>
                                {/* Buttons Div */}
                                <div className={productStyles.buttons}>
                                    <button
                                        className={`${productStyles.button} ${productStyles.btnDark}`}
                                        onClick={() =>
                                            handleAddToCart('preorder')
                                        }
                                    >
                                        Pre-order now
                                    </button>
                                    <button
                                        className={`${productStyles.button} ${productStyles.btnOrange}`}
                                        onClick={() =>
                                            handleAddToCart('quickBuy')
                                        }
                                    >
                                        Quick buy
                                    </button>
                                    <button
                                        className={`${productStyles.button} ${productStyles.btnYellow}`}
                                        onClick={() =>
                                            handleAddToCart('paypal')
                                        }
                                    >
                                        PayPal
                                    </button>

                                    <button
                                        className={`${productStyles.button} ${productStyles.btnDark}`}
                                        onClick={() => handleAddToCart('debit')}
                                    >
                                        Debit or credit card
                                    </button>
                                </div>
                                {points && (
                                    <p
                                        className={`${productStyles.notice} displayNoneAtMobile`}
                                    >
                                        Earn {points} Points on purchase!
                                    </p>
                                )}
                            </Col>
                        </Row>
                        {/* Row 2 */}
                        <Row className={productStyles.row2}>
                            <Col
                                xs={12}
                                md={6}
                                className={productStyles.descriptionCol}
                            >
                                <div className={productStyles.description}>
                                    <h3 className='displayNoneAtMobile'>
                                        Description
                                    </h3>
                                    <div
                                        className={`${productStyles.descriptionDiv} displayNoneAtDesktop`}
                                    >
                                        <h4 className='text-decoration-underline'>
                                            Description
                                        </h4>
                                        <h4>Reviews</h4>
                                    </div>

                                    {data.description && (
                                        <div
                                            className={
                                                productStyles.descriptionDiv2
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: `${data.description}`,
                                            }}
                                        ></div>
                                    )}
                                </div>
                            </Col>
                            <Col
                                xs={12}
                                md={6}
                                className={`${productStyles.row2col2} align-self-center`}
                            >
                                {data.images &&
                                data.images.length > 0 &&
                                data.images[1] ? (
                                    <Image
                                        src={data.images[1].src}
                                        alt={data.name}
                                        width={850}
                                        height={535}
                                    />
                                ) : (
                                    <Image
                                        src='/images/products/image-2.png'
                                        alt='Image 2'
                                        width={850}
                                        height={535}
                                    />
                                )}
                            </Col>
                        </Row>
                        {/* Row 3 */}
                        <Row className={productStyles.row3}>
                            <Col xs={12} md={6}>
                                {data.images &&
                                data.images.length > 0 &&
                                data.images[2] ? (
                                    <Image
                                        src={data.images[2].src}
                                        alt={data.name}
                                        width={850}
                                        height={535}
                                    />
                                ) : (
                                    <Image
                                        src='/images/products/image-3.png'
                                        alt='Image 3'
                                        width={850}
                                        height={674}
                                    />
                                )}
                            </Col>
                            <Col
                                xs={12}
                                md={6}
                                className={productStyles.specsCol}
                            >
                                {/* specs */}
                                {/* <p className={productStyles.specs}>SPECS:</p> */}
                                {data['meta_data'] &&
                                    data['meta_data'].length > 0 &&
                                    data['meta_data'].map((item, index) => {
                                        if (item.key === 'specs') {
                                            return (
                                                <div
                                                    key={index}
                                                    className={
                                                        productStyles.specsListItem
                                                    }
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${item.value}`,
                                                    }}
                                                ></div>
                                            )
                                        }
                                    })}
                                {/* <ul className={productStyles.specsList}>
                                    <li>
                                        <span>Lock Type: </span>
                                        <span>Liner lock</span>
                                    </li>
                                    <li>
                                        <span>Blade thickness: </span>
                                        <span>4mm</span>
                                    </li>
                                    <li>
                                        <span>Blade Length: </span>
                                        <span>3.65”</span>
                                    </li>
                                </ul>
                                <ul className={productStyles.specsList}>
                                    <li>
                                        <span>Handle length: </span>
                                        <span>4.7”</span>
                                    </li>
                                    <li>
                                        <span>Total open length: </span>
                                        <span>8.1”</span>
                                    </li>
                                    <li>
                                        <span>Total weight: </span>
                                        <span>4.9 oz</span>
                                    </li>
                                </ul> */}
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid className={productStyles.lastViewed}>
                        <h3>Last viewed products</h3>
                        <Row className={contentStyles.productsSection}>
                            {lastViewedProducts.map(
                                product =>
                                    product !== null && (
                                        <div key={product.id}>
                                            <div
                                                className={
                                                    contentStyles.product
                                                }
                                            >
                                                <Link
                                                    href={`/product/${product.id}`}
                                                >
                                                    <a>
                                                        {product.images &&
                                                            product.images
                                                                .length > 0 && (
                                                                <Image
                                                                    src={
                                                                        product
                                                                            .images[0]
                                                                            .src
                                                                    }
                                                                    width={445}
                                                                    height={334}
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                />
                                                            )}
                                                    </a>
                                                </Link>
                                                <div
                                                    className={
                                                        productStyles.productInfo
                                                    }
                                                >
                                                    <p
                                                        className={
                                                            contentStyles.productTitle
                                                        }
                                                    >
                                                        {product.name}
                                                    </p>
                                                    <p
                                                        className={
                                                            contentStyles.productPrice
                                                        }
                                                    >
                                                        {product.price
                                                            ? `$${product.price}`
                                                            : '$0'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            )}
                        </Row>
                    </Container>
                    <NotificationContainer />
                </section>
            ) : (
                <section className={`${productStyles.product} text-center`}>
                    <div>
                        <h2>Not Found</h2>
                    </div>
                </section>
            )}
        </Layout>
    )
}

export const getServerSideProps = async ({query}) => {
    let data = null
    let variations = null
    try {
        const product = await axios.get(
            `${process.env.WP_URL}/wp-json/wc/v3/products/${query.id}?consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}`
        )
        // const product = await axios.get(
        //     `https://jsonplaceholder.typicode.com/todos/${query.id}`
        // )
        data = await product.data
    } catch (error) {
        // console.log('error', error)
    }
    try {
        const productVariations = await axios.get(
            `${process.env.WP_URL}/wp-json/wc/v3/products/${query.id}/variations?consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}&order=asc&orderby=id&status=publish`
        )
        // const product = await axios.get(
        //     `https://jsonplaceholder.typicode.com/todos/${query.id}`
        // )
        variations = await productVariations.data
    } catch (error) {
        // console.log('error', error)
    }

    return {
        props: {
            id: query.id,
            data,
            variations,
        },
    }
}

export default Product
