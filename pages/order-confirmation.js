import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import Layout from '../components/Layout'
import orderStyles from '../styles/orderConfirmation.module.css'
const orderItems = [
    {id: 1, name: 'Hades - Jade G10, Stonewashed 14c28n', price: '55', qty: 1},
]

function confirmOrder() {
    return (
        <Layout>
            <div className={orderStyles.order}>
                <h1>Checkout</h1>
                <h3>Thank you. Your order has been received.</h3>
                <Container className={orderStyles.orderDetails}>
                    <Row>
                        <Col>
                            <h2>Order Details</h2>
                            {/* Table like structure with 2 columns */}
                            <div className={orderStyles.orderTable}>
                                <div className={orderStyles.orderRow}>
                                    <p className={orderStyles.orderH}>
                                        Product
                                    </p>
                                    <p className={orderStyles.orderH}>Total</p>
                                </div>
                                <div className={orderStyles.orderRow}>
                                    <ul>
                                        {orderItems.map(item => (
                                            <li key={item.id}>
                                                <p className='mb-3'>
                                                    <span>{item.name}</span>
                                                    <span> * </span>
                                                    <span>{item.qty}</span>
                                                </p>
                                                <p className='mb-3'>
                                                    Pre-Order product
                                                </p>
                                                <p>
                                                    Release date:
                                                    <br /> 24.01.2022 at 00:00
                                                    (UTC+3)
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={orderStyles.orderRow}>
                                    <p className={orderStyles.orderH}>
                                        Order Number:
                                    </p>
                                    <p>DD17290</p>
                                </div>
                                <div className={orderStyles.orderRow}>
                                    <p className={orderStyles.orderH}>Date:</p>
                                    <p>November 11, 2021</p>
                                </div>
                                <div className={orderStyles.orderRow}>
                                    <p className={orderStyles.orderH}>
                                        Subtotal:
                                    </p>
                                    <p>$55</p>
                                </div>
                                <div className={orderStyles.orderRow}>
                                    <p className={orderStyles.orderH}>
                                        Discount:
                                    </p>
                                    <p>-$55</p>
                                </div>
                                <div className={orderStyles.orderRow}>
                                    <p className={orderStyles.orderH}>
                                        Shipping:
                                    </p>
                                    <p>Free Shipping</p>
                                </div>
                                <div className={orderStyles.orderRow}>
                                    <p className={orderStyles.orderH}>Total:</p>
                                    <p>$0.00</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default confirmOrder
