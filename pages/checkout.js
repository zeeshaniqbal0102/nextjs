import Image from 'next/image'
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import {Col, Container, Row, Spinner} from 'react-bootstrap'
import Layout from '../components/Layout'
import {useGlobalContext} from '../contextAPI/context'
import checkoutStyles from '../styles/checkout.module.css'
import orderStyles from '../styles/orderConfirmation.module.css'
import axios from 'axios'
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector'
import {NotificationContainer} from 'react-notifications'
import {createNotification} from '../functions/utils'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

// const orderItems = [
//     {
//         id: 1,
//         name: 'Hades - Jade G10, Stonewashed 14c28n',
//         price: '55',
//         qty: 1,
//         image: '/images/products/image-1-small.png',
//     },
// ]

// const shippingMethods = [
//     {
//         id: 1,
//         name: 'Standard Shipping',
//         price: '$5.00',
//         description: 'Standard Shipping',
//     },
//     {
//         id: 2,
//         name: 'Express Shipping',
//         price: '$10.00',
//         description: 'Express Shipping',
//     },
// ]

// const paymentMethods = [
//     {
//         id: 1,
//         name: 'American Express',
//         image: '/images/american-express.png',
//     },
//     {
//         id: 2,
//         name: 'Visa',
//         image: '/images/visa.png',
//     },
//     {
//         id: 3,
//         name: 'MasterCard',
//         image: '/images/mastercard.png',
//     },
//     {
//         id: 4,
//         name: 'PayPal',
//         image: '/images/paypal.png',
//     },
//     {
//         id: 5,
//         name: 'Google Pay',
//         image: '/images/google-pay.png',
//     },
// ]
const paymentMethods = [
    {
        id: 'nmi',
        name: 'Network Merchants (NMI)',
        image: '/images/payment-methods/nmi.png',
    },
    {
        id: 'sezzlepay',
        name: 'Sezzle',
        image: '/images/payment-methods/sezzle.png',
    },
    {
        id: 'crypto_pay',
        name: 'Crypto.com Pay',
        image: '/images/payment-methods/crypto.png',
    },
    {
        id: 'coinbase',
        name: 'Coinbase',
        image: '/images/payment-methods/coinbase.png',
    },
]

const Checkout = () => {
    const [shipToAnotherAddress, setShipToAnotherAddress] = useState(false)
    const [loadingComponent, setLoadingComponent] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [paymentMethodsOriginal, setPaymentMethodsOriginal] = useState([])
    const [enabledPaymentMethods, setEnabledPaymentMethods] = useState([])
    const [processingForm, setProcessingForm] = useState(false)
    const [processingPayment, setProcessingPayment] = useState(false)
    const [isProcessingFormError, setIsProcessingFormError] = useState(false)
    const [loadingCustomerInitially, setLoadingCustomerInitially] =
        useState(false)
    const [errorCustomerInitially, setErrorCustomerInitially] = useState(false)
    const [customerDetails, setCustomerDetails] = useState({})
    const [paymentMethodField, setPaymentMethodField] = useState({
        payment_method: '',
        payment_method_title: '',
    })
    const [countryRegionBilling, setCountryRegionBilling] = useState({
        country: '',
        region: '',
    })
    const [countryRegionShipping, setCountryRegionShipping] = useState({
        country: '',
        region: '',
    })
    // state for checkout form fields
    const [formFields, setFormFields] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        address2: '',
        city: '',
        zipcode: '',
        ship_firstName: '',
        ship_lastName: '',
        ship_phone: '',
        ship_email: '',
        ship_address: '',
        ship_address2: '',
        ship_city: '',
        ship_zipcode: '',
        // payment_method: '',
        // payment_method_title: '',
        terms: true,
    })
    const {
        cart,
        total,
        discount,
        amount,
        clearCart,
        removeItem,
        increaseAmount,
        decreaseAmount,
        directCheckout,
        currentUser,
    } = useGlobalContext()

    const handlePaymentMethodChange = (payId, payName) => {
        setPaymentMethodField({
            payment_method: payId,
            payment_method_title: payName,
        })
    }
    const selectCountryBilling = country => {
        setCountryRegionBilling({
            ...countryRegionBilling,
            country: country,
        })
    }

    const selectRegionBilling = region => {
        setCountryRegionBilling({
            ...countryRegionBilling,
            region: region,
        })
    }
    const selectCountryShipping = country => {
        setCountryRegionShipping({
            ...countryRegionShipping,
            country: country,
        })
    }

    const selectRegionShipping = region => {
        setCountryRegionShipping({
            ...countryRegionShipping,
            region: region,
        })
    }

    const handleFormFieldChange = e => {
        // console.log(e.target.value)
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        })

        if (e.target.name === 'terms') {
            if (e.target.checked) {
                setFormFields({
                    ...formFields,
                    terms: true,
                })
            } else {
                setFormFields({
                    ...formFields,
                    terms: false,
                })
            }
        }
    }

    const handleFormSubmit = async e => {
        e.preventDefault()
        setProcessingForm(false)
        // submit form only if terms are accepted and all fields are filled and cart is not empty
        if (!formFields.firstName) {
            createNotification('error', 'Please enter your first name')
            return
        }
        if (!formFields.lastName) {
            createNotification('error', 'Please enter your last name')
            return
        }
        if (!formFields.email) {
            createNotification('error', 'Please enter your email')
            return
        }
        if (!formFields.phone) {
            createNotification('error', 'Please enter your phone number')
            return
        }
        if (!formFields.address) {
            createNotification('error', 'Please enter your address')
            return
        }
        if (!formFields.city) {
            createNotification('error', 'Please enter your city')
            return
        }
        if (!formFields.zipcode) {
            createNotification('error', 'Please enter your zipcode')
            return
        }
        if (paymentMethodField.payment_method === '') {
            createNotification('error', 'Please select a payment method')
            return
        }
        if (!formFields.terms) {
            createNotification(
                'error',
                'Please accept our terms and conditions'
            )
            return
        }
        if (cart.length === 0) {
            createNotification('error', 'Your cart is empty')
            return
        }
        // console.log('Outer')
        setProcessingForm(true)
        const cartItems = cart.map(item => {
            return {
                product_id: item.id,
                // product_name: item.name,
                quantity: item.amount,
                variation_id: item.variationId ? item.variationId : null,
                // variation: item.variation,
            }
        })
        const shippingLines = [
            {
                method_id: 'flat_rate',
                method_title: 'Flat Rate',
                total: '10.00',
            },
        ]
        const dataToSend = {
            billing: {
                first_name: formFields.firstName,
                last_name: formFields.lastName,
                phone: formFields.phone,
                email: formFields.email,
                address_1: formFields.address,
                address_2: formFields.address2,
                city: formFields.city,
                postcode: formFields.zipcode,
                country: countryRegionBilling.country,
                state: countryRegionBilling.region,
            },
            shipping: {
                first_name: formFields.ship_firstName,
                last_name: formFields.ship_lastName,
                phone: formFields.ship_phone,
                email: formFields.ship_email,
                address_1: formFields.ship_address,
                address_2: formFields.ship_address2,
                city: formFields.ship_city,
                postcode: formFields.ship_zipcode,
                country: countryRegionShipping.country,
                state: countryRegionShipping.region,
            },
            line_items: cartItems,
            shipping_lines: shippingLines,

            payment_method: paymentMethodField.payment_method,
            payment_method_title: paymentMethodField.payment_method_title,
        }

        try {
            const response = await axios.post(`api/checkout`, dataToSend)
            const {data, message} = await response.data
            // console.log('response', data)
            console.log('message', message)
        } catch (error) {
            // console.log(error)
            setIsProcessingFormError(true)
            setProcessingForm(false)
        }
    }

    // api call to get payment methods
    // const getPaymentMethods = async () => {
    //     setIsLoading(true)
    //     setIsError(false)
    //     try {
    //         const response = await axios.get(`/api/payment-gateways`)
    //         const methods = await response.data.data
    //         // setPaymentMethodsOriginal(methods)
    //         const enabledMethods = methods.filter(
    //             method => method.enabled == true
    //         )
    //         // only get id and name
    //         const enabledMethodsIdName = enabledMethods.map(method => {
    //             return {
    //                 id: method.id,
    //                 name: method.method_title,
    //                 description: method.method_description,
    //             }
    //         })
    //         setEnabledPaymentMethods(enabledMethodsIdName)
    //         // console.log('enabledMethodsIdName', enabledMethodsIdName)
    //         setIsLoading(false)
    //         setIsError(false)
    //     } catch (error) {
    //         setIsError(true)
    //         setIsLoading(false)
    //         // console.log(error)
    //     }
    // }

    // api call to get customer details
    const getCustomerDetails = async () => {
        setLoadingCustomerInitially(true)
        setErrorCustomerInitially(false)
        try {
            const response = await axios.get(
                `/api/dashboard/addresses?customer=${currentUser.id}`
            )
            const {data, message} = await response.data
            setCustomerDetails(data)
            // console.log('Customer Details', data)
            setFormFields({
                ...formFields,
                firstName: data.billing.first_name,
                lastName: data.billing.last_name,
                email: data.billing.email,
                phone: data.billing.phone,
                address: data.billing.address_1,
                address2: data.billing.address_2,
                city: data.billing.city,
                zipcode: data.billing.postcode,
                country: data.billing.country,
                region: data.billing.state,
            })
            setCountryRegionBilling({
                country: data.billing.country,
                region: data.billing.state,
            })

            setLoadingCustomerInitially(false)
            setErrorCustomerInitially(false)
        } catch (error) {
            setErrorCustomerInitially(error.response.data.message)
            setLoadingCustomerInitially(false)
            // console.log(error)
        }
    }
    useEffect(() => {
        if (currentUser && currentUser.id && cart && cart.length > 0) {
            getCustomerDetails()
        }
    }, [currentUser])

    useEffect(() => {
        setTimeout(() => {
            setLoadingComponent(false)
        }, 300)
    }, [])
    if (loadingComponent) {
        return (
            <Container>
                <Row className='mt-5'>
                    <Col className='text-center'>
                        <Spinner animation='border' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            </Container>
        )
    }
    return (
        <Layout>
            <div className={checkoutStyles.checkout}>
                {currentUser ? (
                    <h1 className='mb-5'>Checkout</h1>
                ) : (
                    <h1>Checkout</h1>
                )}
                {!currentUser && (
                    <p className={checkoutStyles.loginNotice}>
                        Returning customer?{' '}
                        <Link href='/login'>
                            <a>Click here to login</a>
                        </Link>
                        . For faster checkout, login or register using your
                        social account.{' '}
                        <Link href='/login'>
                            <a>Click here to login</a>
                        </Link>
                    </p>
                )}
                <Container>
                    {cart && cart.length === 0 && (
                        <Row className='mb-5'>
                            <Col sm={12}>
                                <p>Your cart is empty</p>
                                <Link href='/shop'>
                                    <button
                                        className={checkoutStyles.emptyCartBtn}
                                    >
                                        <ShoppingCartIcon />{' '}
                                        <span>Start Shopping!</span>
                                    </button>
                                </Link>
                            </Col>
                        </Row>
                    )}
                </Container>
                {cart && cart.length > 0 && (
                    <Container className={checkoutStyles.checkoutDetails}>
                        <Row className={checkoutStyles.checkoutDetailsRow}>
                            <Col
                                sm={12}
                                md={6}
                                className={checkoutStyles.checkoutColLeft}
                            >
                                <div
                                    className={
                                        checkoutStyles.checkoutColLeftInner
                                    }
                                >
                                    <h3>Your Order</h3>
                                    <div className={orderStyles.orderTable}>
                                        <div className={orderStyles.orderRow}>
                                            <p className={orderStyles.orderH}>
                                                Product
                                            </p>
                                            <p className={orderStyles.orderH}>
                                                Total
                                            </p>
                                        </div>
                                        <div
                                            className={`${orderStyles.orderRow} ${checkoutStyles.orderRowUl}`}
                                        >
                                            <ul>
                                                {cart &&
                                                    cart.length > 0 &&
                                                    cart.map(
                                                        (item, itemIdx) => (
                                                            <li
                                                                className={
                                                                    checkoutStyles.productItem
                                                                }
                                                                key={itemIdx}
                                                            >
                                                                <div
                                                                    className={
                                                                        checkoutStyles.productItemLeft
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            checkoutStyles.productItemLeftImgWrapper
                                                                        }
                                                                    >
                                                                        <Image
                                                                            src={
                                                                                item.img
                                                                            }
                                                                            width={
                                                                                100
                                                                            }
                                                                            height={
                                                                                80
                                                                            }
                                                                            alt={
                                                                                item.title
                                                                            }
                                                                            className={`${checkoutStyles.productImage}`}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            checkoutStyles.productItemLeftInfo
                                                                        }
                                                                    >
                                                                        <p
                                                                            className={`${checkoutStyles.pnamePara} mb-2`}
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    item.title
                                                                                }
                                                                            </span>
                                                                        </p>
                                                                        <p
                                                                            className={`${checkoutStyles.pnamePara} mb-3`}
                                                                            style={{
                                                                                fontSize:
                                                                                    '19px',
                                                                            }}
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    item.variation
                                                                                }
                                                                            </span>
                                                                        </p>
                                                                        <p
                                                                            className={
                                                                                checkoutStyles.shipByPara
                                                                            }
                                                                        >
                                                                            Ships
                                                                            by
                                                                            date:
                                                                            <br />{' '}
                                                                            02/24/2022
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        checkoutStyles.productItemRight
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            checkoutStyles.productItemRightLeft
                                                                        }
                                                                    >
                                                                        <p
                                                                            className={
                                                                                checkoutStyles.crossSymbol
                                                                            }
                                                                        >
                                                                            x
                                                                        </p>
                                                                        <div
                                                                            className={
                                                                                checkoutStyles.amountsDiv
                                                                            }
                                                                        >
                                                                            {/* increase amount */}
                                                                            <button
                                                                                className={
                                                                                    checkoutStyles.amountBtn
                                                                                }
                                                                                onClick={() =>
                                                                                    increaseAmount(
                                                                                        item.id
                                                                                    )
                                                                                }
                                                                                title='Increase amount'
                                                                            >
                                                                                <ExpandLessIcon />
                                                                                {/* <svg
                                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                                    viewBox='0 0 20 20'
                                                                                >
                                                                                    <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
                                                                                </svg> */}
                                                                            </button>
                                                                            {/* amount */}
                                                                            <p
                                                                                className={
                                                                                    checkoutStyles.amount
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.amount
                                                                                }
                                                                            </p>
                                                                            {/* decrease amount */}
                                                                            <button
                                                                                className={
                                                                                    checkoutStyles.amountBtn
                                                                                }
                                                                                onClick={() =>
                                                                                    decreaseAmount(
                                                                                        item.id,
                                                                                        item.amount
                                                                                    )
                                                                                }
                                                                                title='Decrease amount'
                                                                            >
                                                                                <ExpandMoreIcon />
                                                                                {/* <svg
                                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                                    viewBox='0 0 20 20'
                                                                                >
                                                                                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                                                                </svg> */}
                                                                            </button>
                                                                        </div>
                                                                        {/* <input
                                                                    type='number'
                                                                    min={1}
                                                                    max={10}
                                                                    defaultValue={
                                                                        item.amount
                                                                    }
                                                                /> */}
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            checkoutStyles.productItemRightRight
                                                                        }
                                                                    >
                                                                        <p
                                                                            className={
                                                                                checkoutStyles.ppriceParaAmnt
                                                                            }
                                                                        >
                                                                            $
                                                                            {item.price
                                                                                ? item.price
                                                                                : 0}
                                                                        </p>
                                                                        <button
                                                                            onClick={() =>
                                                                                removeItem(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            className={
                                                                                checkoutStyles.crossBtn
                                                                            }
                                                                            title='Remove item'
                                                                        >
                                                                            X
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                        </div>
                                        <div className={orderStyles.orderRow}>
                                            <p className={orderStyles.orderH}>
                                                Subtotal:
                                            </p>
                                            <p>${total}</p>
                                        </div>
                                        <div className={orderStyles.orderRow}>
                                            <p className={orderStyles.orderH}>
                                                Discount:
                                            </p>
                                            <p>-${discount ? discount : '0'}</p>
                                        </div>
                                        <div className={orderStyles.orderRow}>
                                            <p className={orderStyles.orderH}>
                                                Shipping:
                                            </p>
                                            <p>Free Shipping</p>
                                        </div>
                                        <div className={orderStyles.orderRow}>
                                            <p className={orderStyles.orderH}>
                                                Total:
                                            </p>
                                            <p>${total - discount}</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                sm={12}
                                md={6}
                                className={checkoutStyles.checkoutColRight}
                            >
                                <div
                                    className={
                                        checkoutStyles.checkoutColRightInner
                                    }
                                >
                                    <h3>Ship to</h3>
                                    {loadingCustomerInitially && (
                                        <div className={checkoutStyles.loader}>
                                            <Skeleton
                                                count={9}
                                                height={55}
                                                className='mb-2'
                                            />
                                        </div>
                                    )}
                                    {!loadingCustomerInitially &&
                                        !errorCustomerInitially &&
                                        customerDetails && (
                                            <form onSubmit={handleFormSubmit}>
                                                <div
                                                    className={
                                                        checkoutStyles.formRow
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        <input
                                                            type='text'
                                                            placeholder='First Name *'
                                                            name='firstName'
                                                            id='firstName'
                                                            required
                                                            className='mrInput'
                                                            onChange={
                                                                handleFormFieldChange
                                                            }
                                                            value={
                                                                formFields.firstName
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        <input
                                                            type='text'
                                                            placeholder='Last Name *'
                                                            name='lastName'
                                                            id='lastName'
                                                            required
                                                            className='mrInput'
                                                            onChange={
                                                                handleFormFieldChange
                                                            }
                                                            value={
                                                                formFields.lastName
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        checkoutStyles.formRow
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        <input
                                                            type='tel'
                                                            placeholder='Phone *'
                                                            name='phone'
                                                            id='phone'
                                                            required
                                                            className='mrInput'
                                                            onChange={
                                                                handleFormFieldChange
                                                            }
                                                            value={
                                                                formFields.phone
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        <input
                                                            type='email'
                                                            placeholder='Email Address *'
                                                            name='email'
                                                            id='email'
                                                            required
                                                            className='mrInput'
                                                            onChange={
                                                                handleFormFieldChange
                                                            }
                                                            value={
                                                                formFields.email
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        checkoutStyles.formRow
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        <input
                                                            type='text'
                                                            placeholder='Street Address *'
                                                            name='address'
                                                            id='address'
                                                            required
                                                            className='mrInput'
                                                            onChange={
                                                                handleFormFieldChange
                                                            }
                                                            value={
                                                                formFields.address
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        <input
                                                            type='text'
                                                            placeholder='Address 2 *'
                                                            name='address2'
                                                            id='address2'
                                                            // required
                                                            className='mrInput'
                                                            onChange={
                                                                handleFormFieldChange
                                                            }
                                                            value={
                                                                formFields.address2
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        checkoutStyles.formRow
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        <input
                                                            type='text'
                                                            placeholder='City *'
                                                            name='city'
                                                            id='city'
                                                            required
                                                            className='mrInput'
                                                            onChange={
                                                                handleFormFieldChange
                                                            }
                                                            value={
                                                                formFields.city
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        <input
                                                            type='text'
                                                            placeholder='ZIP Code *'
                                                            name='zipcode'
                                                            id='zipcode'
                                                            required
                                                            className='mrInput'
                                                            onChange={
                                                                handleFormFieldChange
                                                            }
                                                            value={
                                                                formFields.zipcode
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className={checkoutStyles.formRow}>
                                        <div
                                            className={
                                                checkoutStyles.inputWrapper
                                            }
                                        >
                                            <select
                                                name='country'
                                                id='country'
                                                required
                                                className='mrInput'
                                            >
                                                <option value=''>
                                                    Country *
                                                </option>
                                                {countries.map(
                                                    (country, index) => (
                                                        <option
                                                            key={index}
                                                            value={country.code}
                                                        >
                                                            {country.name} (
                                                            {country.code})
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <div
                                            className={
                                                checkoutStyles.inputWrapper
                                            }
                                        >
                                            <select
                                                name='state'
                                                id='state'
                                                required
                                                className='mrInput'
                                            >
                                                <option value=''>
                                                    State *
                                                </option>
                                                {states.map((state, index) => (
                                                    <option
                                                        key={index}
                                                        value={state.code}
                                                    >
                                                        {state.name} (
                                                        {state.code})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div> */}
                                                {/* Country Region Library */}
                                                <div
                                                    className={
                                                        checkoutStyles.formRow
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        {/* country dropdown */}
                                                        <CountryDropdown
                                                            value={
                                                                countryRegionBilling.country
                                                            }
                                                            valueType='short'
                                                            onChange={val =>
                                                                selectCountryBilling(
                                                                    val
                                                                )
                                                            }
                                                            name='country'
                                                            id='country'
                                                            classes='mrInput'
                                                            // required
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            checkoutStyles.inputWrapper
                                                        }
                                                    >
                                                        {/* states dropdown */}
                                                        <RegionDropdown
                                                            country={
                                                                countryRegionBilling.country
                                                            }
                                                            value={
                                                                countryRegionBilling.region
                                                            }
                                                            countryValueType='short'
                                                            defaultOptionLabel='State *'
                                                            valueType='short'
                                                            onChange={val =>
                                                                selectRegionBilling(
                                                                    val
                                                                )
                                                            }
                                                            name='state'
                                                            id='state'
                                                            classes='mrInput'
                                                            // required
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        checkoutStyles.formRow
                                                    }
                                                >
                                                    <li
                                                        onClick={() =>
                                                            setShipToAnotherAddress(
                                                                !shipToAnotherAddress
                                                            )
                                                        }
                                                        className={
                                                            checkoutStyles.shipToElseBtn
                                                        }
                                                    >
                                                        Ship to another address?
                                                    </li>
                                                </div>
                                                {shipToAnotherAddress && (
                                                    <>
                                                        <div
                                                            className={
                                                                checkoutStyles.formRow
                                                            }
                                                        >
                                                            <h4>
                                                                Shipping
                                                                Details:
                                                            </h4>
                                                        </div>
                                                        <div
                                                            className={
                                                                checkoutStyles.formRow
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                <input
                                                                    type='text'
                                                                    placeholder='First Name *'
                                                                    name='ship_firstName'
                                                                    id='ship_firstName'
                                                                    required
                                                                    className='mrInput'
                                                                    onChange={
                                                                        handleFormFieldChange
                                                                    }
                                                                    value={
                                                                        formFields.ship_firstName
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                <input
                                                                    type='text'
                                                                    placeholder='Last Name *'
                                                                    name='ship_lastName'
                                                                    id='ship_lastName'
                                                                    required
                                                                    className='mrInput'
                                                                    onChange={
                                                                        handleFormFieldChange
                                                                    }
                                                                    value={
                                                                        formFields.ship_lastName
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                checkoutStyles.formRow
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                <input
                                                                    type='tel'
                                                                    placeholder='Phone *'
                                                                    name='ship_phone'
                                                                    id='ship_phone'
                                                                    required
                                                                    className='mrInput'
                                                                    onChange={
                                                                        handleFormFieldChange
                                                                    }
                                                                    value={
                                                                        formFields.ship_phone
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                <input
                                                                    type='email'
                                                                    placeholder='Email Address *'
                                                                    name='ship_email'
                                                                    id='ship_email'
                                                                    required
                                                                    className='mrInput'
                                                                    onChange={
                                                                        handleFormFieldChange
                                                                    }
                                                                    value={
                                                                        formFields.ship_email
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                checkoutStyles.formRow
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                <input
                                                                    type='text'
                                                                    placeholder='Street Address *'
                                                                    name='ship_address'
                                                                    id='ship_address'
                                                                    required
                                                                    className='mrInput'
                                                                    onChange={
                                                                        handleFormFieldChange
                                                                    }
                                                                    value={
                                                                        formFields.ship_address
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                <input
                                                                    type='text'
                                                                    placeholder='Address 2 *'
                                                                    name='ship_address2'
                                                                    id='ship_address2'
                                                                    // required
                                                                    className='mrInput'
                                                                    onChange={
                                                                        handleFormFieldChange
                                                                    }
                                                                    value={
                                                                        formFields.ship_address2
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                checkoutStyles.formRow
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                <input
                                                                    type='text'
                                                                    placeholder='City *'
                                                                    name='ship_city'
                                                                    id='ship_city'
                                                                    required
                                                                    className='mrInput'
                                                                    onChange={
                                                                        handleFormFieldChange
                                                                    }
                                                                    value={
                                                                        formFields.ship_city
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                <input
                                                                    type='text'
                                                                    placeholder='ZIP Code *'
                                                                    name='ship_zipcode'
                                                                    id='ship_zipcode'
                                                                    required
                                                                    className='mrInput'
                                                                    onChange={
                                                                        handleFormFieldChange
                                                                    }
                                                                    value={
                                                                        formFields.ship_zipcode
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                checkoutStyles.formRow
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                {/* country dropdown */}
                                                                <CountryDropdown
                                                                    value={
                                                                        countryRegionShipping.country
                                                                    }
                                                                    valueType='short'
                                                                    onChange={val =>
                                                                        selectCountryShipping(
                                                                            val
                                                                        )
                                                                    }
                                                                    name='ship_country'
                                                                    id='ship_country'
                                                                    classes='mrInput'
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    checkoutStyles.inputWrapper
                                                                }
                                                            >
                                                                {/* states dropdown */}
                                                                <RegionDropdown
                                                                    country={
                                                                        countryRegionShipping.country
                                                                    }
                                                                    value={
                                                                        countryRegionShipping.region
                                                                    }
                                                                    countryValueType='short
                                                        '
                                                                    defaultOptionLabel='State *'
                                                                    valueType='short'
                                                                    onChange={val =>
                                                                        selectRegionShipping(
                                                                            val
                                                                        )
                                                                    }
                                                                    name='ship_state'
                                                                    id='ship_state'
                                                                    classes='mrInput'
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                <div
                                                    className={`${checkoutStyles.formRow} ${checkoutStyles.formRowPayment}`}
                                                >
                                                    {/* {paymentMethods.map(
                                            (paymentMethod, index) => (
                                                <a href='#' key={index}>
                                                    <Image
                                                        src={
                                                            paymentMethod.image
                                                        }
                                                        width={76}
                                                        height={45}
                                                        alt={paymentMethod.name}
                                                    />
                                                </a>
                                            )
                                        )} */}
                                                    {/* {enabledPaymentMethods && (
                                            <div>
                                                <h5>
                                                    Please select a payment
                                                    method
                                                </h5>
                                            </div>
                                        )} */}
                                                    {/* Radio buttons */}
                                                    {paymentMethods &&
                                                        paymentMethods.length >
                                                            0 &&
                                                        paymentMethods.map(
                                                            paymentMethod => (
                                                                <div
                                                                    key={
                                                                        paymentMethod.id
                                                                    }
                                                                    className={
                                                                        checkoutStyles.paymentMethod
                                                                    }
                                                                >
                                                                    <input
                                                                        type='radio'
                                                                        name='payment_method'
                                                                        id={
                                                                            paymentMethod.id
                                                                        }
                                                                        value={
                                                                            paymentMethod.id
                                                                        }
                                                                        // required
                                                                        // className='mrInput'
                                                                        onChange={() =>
                                                                            handlePaymentMethodChange(
                                                                                paymentMethod.id,
                                                                                paymentMethod.name
                                                                            )
                                                                        }
                                                                        checked={
                                                                            paymentMethodField.payment_method ===
                                                                            paymentMethod.id
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor={
                                                                            paymentMethod.id
                                                                        }
                                                                        className={`drinkcard-cc ${checkoutStyles.paymentMethodLabel}`}
                                                                        style={{
                                                                            backgroundImage: `url(${paymentMethod.image})`,
                                                                        }}
                                                                    >
                                                                        {/* <Image
                                                                src={
                                                                    paymentMethod.image
                                                                }
                                                                width={76}
                                                                height={45}
                                                                alt={
                                                                    paymentMethod.name
                                                                }
                                                            /> */}
                                                                        {/* {paymentMethod.name} */}
                                                                    </label>

                                                                    {/* {paymentMethod.description && (
                                                            <p>
                                                                {
                                                                    paymentMethod.description
                                                                }
                                                            </p>
                                                        )} */}
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                                <div
                                                    className={
                                                        checkoutStyles.formRow
                                                    }
                                                >
                                                    {/* checkbox */}
                                                    <div
                                                        className={
                                                            checkoutStyles.checkboxWrapper
                                                        }
                                                    >
                                                        <input
                                                            type='checkbox'
                                                            name='terms'
                                                            id='terms'
                                                            // required
                                                            defaultChecked={
                                                                true
                                                            }
                                                            onChange={
                                                                handleFormFieldChange
                                                            }
                                                            defaultValue={
                                                                formFields.terms
                                                            }
                                                        />
                                                        <label htmlFor='terms'>
                                                            {`I agree to the site's terms and
                                                conditions & privacy policy *`}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        checkoutStyles.formRow
                                                    }
                                                >
                                                    <button
                                                        type='submit'
                                                        name='submit'
                                                        className={
                                                            checkoutStyles.submitBtn
                                                        }
                                                    >
                                                        Order Now
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )}
                {/* {cart && cart.length === 0 && (
                    <Container className='mb-5'>
                        <Row>
                            <Col sm={12}>
                                <p>Your cart is empty</p>
                                <Link href='/shop'>
                                    <button
                                        className={checkoutStyles.emptyCartBtn}
                                    >
                                        <ShoppingCartIcon />{' '}
                                        <span>Start Shopping!</span>
                                    </button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                )} */}
            </div>
            <NotificationContainer />
        </Layout>
    )
}

export default Checkout
