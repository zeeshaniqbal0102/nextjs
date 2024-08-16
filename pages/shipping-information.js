import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'
import {Col, Container, Row, Breadcrumb, BreadcrumbItem} from 'react-bootstrap'
import Layout from '../components/Layout'
import {createNotification} from '../functions/utils'
import {NotificationContainer} from 'react-notifications'
import shippingStyles from '../styles/shipping.module.css'
import axios from 'axios'

function ShippingInformation() {
    const [formFields, setFormFields] = useState({
        orderId: '',
        email: '',
    })
    const [sendingForm, setSendingForm] = useState(false)
    const [formError, setFormError] = useState({message: ''})

    const handleFormFiledsChange = e => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        })
    }
    const handleFormSubmit = async e => {
        setSendingForm(false)
        e.preventDefault()
        if (!formFields.orderId) {
            createNotification('error', 'Please enter your order id')
            return
        }
        if (!formFields.email) {
            createNotification('error', 'Please enter your email')
            return
        }
        // send post axios api call
        const dataToSend = {
            orderId: formFields.orderId,
            email: formFields.email,
        }
        setSendingForm(true)
        try {
            setFormError({message: ''})
            const response = await axios.post(`/api/track-order`, dataToSend)
            const {data, message} = await response.data
            // console.log('Data', data)
            setFormError({message: message})
            setSendingForm(false)
            setFormFields({
                orderId: '',
                email: '',
            })
        } catch (error) {
            setFormError({message: `There was an error`})
            setSendingForm(false)
            // console.log('error', error)
        }
    }

    return (
        <Layout>
            <Container className={shippingStyles.container}>
                <Row className='mt-3 mb-3'>
                    <Col className={shippingStyles.breadCol}>
                        {/* breadcrumb */}
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link href='/'>
                                    <a className='textDark'>Home</a>
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Ship Info - Track Order
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col className={shippingStyles.shipInfoText}>
                        <p>
                            In stock products will be dispatched within{' '}
                            <strong>3 working days</strong>. Pre order products
                            will ship on the expected ship date visible on the
                            product page.
                        </p>
                        <p>
                            Packages are shipped out of{' '}
                            <strong>Westland, Michigan, U.S.A</strong>.
                        </p>
                        <p>
                            Packages within the U.S.A. are shipped by{' '}
                            <strong>USPS First class</strong>.
                        </p>
                        <p>
                            International packages are shipped with{' '}
                            <strong>UPS or DHL</strong>. We are not liable for
                            custom clearance and/ or custom duties.
                        </p>
                        <p>
                            Not shipping to <strong>Australia</strong> at the
                            moment.
                        </p>
                    </Col>
                </Row>
                <form onSubmit={handleFormSubmit} className='mt-3'>
                    <Row>
                        <Col
                            sm={12}
                            md={6}
                            className={shippingStyles.formGroup}
                        >
                            <label htmlFor='orderId'>
                                <strong>Order Id</strong>
                            </label>
                            <br />
                            <input
                                type='number'
                                id='orderId'
                                name='orderId'
                                className={shippingStyles.formControl}
                                placeholder='Found in your order confirmation email.'
                                required
                                onChange={handleFormFiledsChange}
                                value={formFields.orderId}
                            />
                        </Col>
                        <Col
                            sm={12}
                            md={6}
                            className={shippingStyles.formGroup}
                        >
                            <label htmlFor='email'>
                                <strong>Billing email</strong>
                            </label>
                            <br />
                            <input
                                type='email'
                                id='email'
                                name='email'
                                className={shippingStyles.formControl}
                                placeholder='Email you used during checkout.'
                                required
                                onChange={handleFormFiledsChange}
                                value={formFields.email}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='text-center'>
                            <button
                                type='submit'
                                className={shippingStyles.btnSubmit}
                                disabled={sendingForm}
                            >
                                {sendingForm ? 'Tracking...' : 'Track'}
                            </button>
                        </Col>
                    </Row>
                    {formError.message && (
                        <Row className='mt-3'>
                            <Col>
                                <p>{formError.message}</p>
                            </Col>
                        </Row>
                    )}
                </form>
            </Container>
            <NotificationContainer />
        </Layout>
    )
}

export default ShippingInformation
