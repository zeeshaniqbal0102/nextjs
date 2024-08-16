import Layout from '../../components/Layout'
import React, {useState, useEffect} from 'react'
import {Col, Container, Row, BreadcrumbItem, Breadcrumb} from 'react-bootstrap'
import dashboardStyles from './Dashboard.module.css'
import orderSingleStyles from '../dashboard/order/[id]/order.module.css'
import orderStyles from '../../styles/orderConfirmation.module.css'
import Menu from '../../components/Dashboard/Menu'
import Link from 'next/link'
import axios from 'axios'
import {useGlobalContext} from '../../contextAPI/context'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled'
import MarkunreadIcon from '@material-ui/icons/Markunread'
import ProtectedArea from '../../components/ProtectedArea'

function Addresses() {
    const [addresses, setAddresses] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const {currentUser} = useGlobalContext()

    const fetchAddresses = async () => {
        setLoading(true)
        setError(false)
        if (currentUser && currentUser.id) {
            try {
                const response = await axios.get(
                    `/api/dashboard/addresses?customer=${currentUser.id}`
                )
                const {data} = await response.data
                setAddresses(data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setLoading(false)
                // setError(error.response.data.message)
                setError(error.response.data.message)
            }
        }
    }
    useEffect(() => {
        fetchAddresses()
    }, [currentUser])
    return (
        <Layout>
            <div className={dashboardStyles.dashboard}>
                <h1>Addresses</h1>
                <div className={dashboardStyles.breadcrumb}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link href='/'>
                                <a>Home</a>
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link href='/dashboard'>
                                <a>Dashboard</a>
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Addresses</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <Container className={dashboardStyles.container}>
                    <Row>
                        <Col
                            sm={12}
                            md={5}
                            lg={4}
                            className={dashboardStyles.leftCol}
                        >
                            <Menu />
                        </Col>
                        <Col
                            sm={12}
                            md={7}
                            lg={8}
                            className={dashboardStyles.rightCol}
                        >
                            <h2>Manage Addresses</h2>
                            <p>
                                The following addresses will be used on the
                                checkout page by default.
                            </p>
                            {error && (
                                <div className='alert alert-danger'>
                                    {error}
                                </div>
                            )}

                            <Row className='mt-5'>
                                <Col>
                                    <h3 className='mb-2'>Billing address</h3>
                                    {loading && <Skeleton count={5} />}
                                    {!loading &&
                                        !error &&
                                        addresses &&
                                        addresses.billing && (
                                            <div
                                                className={
                                                    orderSingleStyles.address
                                                }
                                            >
                                                <p>
                                                    {
                                                        addresses.billing
                                                            .first_name
                                                    }{' '}
                                                    {
                                                        addresses.billing
                                                            .last_name
                                                    }
                                                </p>
                                                <p>
                                                    {addresses.billing
                                                        .address_1 &&
                                                        addresses.billing
                                                            .address_1 +
                                                            ','}{' '}
                                                    {
                                                        addresses.billing
                                                            .address_2
                                                    }
                                                </p>
                                                <p>
                                                    {addresses.billing.city &&
                                                        addresses.billing.city +
                                                            ','}{' '}
                                                    {addresses.billing.state}{' '}
                                                    {addresses.billing.postcode}
                                                </p>
                                                {addresses.billing.phone && (
                                                    <p>
                                                        <PhoneEnabledIcon />{' '}
                                                        <span>
                                                            {
                                                                addresses
                                                                    .billing
                                                                    .phone
                                                            }
                                                        </span>
                                                    </p>
                                                )}
                                                {addresses.billing.email && (
                                                    <p>
                                                        <MarkunreadIcon />{' '}
                                                        <span>
                                                            {
                                                                addresses
                                                                    .billing
                                                                    .email
                                                            }
                                                        </span>
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                </Col>
                                <Col style={{textAlign: 'right'}}>
                                    {addresses && (
                                        <button
                                            className='btn btn-dark'
                                            onClick={() => {
                                                window.location.href =
                                                    '/dashboard/edit-addresses?action=billing'
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </Col>
                            </Row>
                            <Row className='mt-5'>
                                <Col>
                                    <h3 className='mb-2'>Shipping address</h3>
                                    {loading && <Skeleton count={5} />}
                                    {!loading &&
                                        !error &&
                                        addresses &&
                                        addresses.shipping && (
                                            <div
                                                className={
                                                    orderSingleStyles.address
                                                }
                                            >
                                                <p>
                                                    {
                                                        addresses.shipping
                                                            .first_name
                                                    }{' '}
                                                    {
                                                        addresses.shipping
                                                            .last_name
                                                    }
                                                </p>
                                                <p>
                                                    {addresses.shipping
                                                        .address_1 &&
                                                        addresses.shipping
                                                            .address_1 +
                                                            ','}{' '}
                                                    {
                                                        addresses.shipping
                                                            .address_2
                                                    }
                                                </p>
                                                <p>
                                                    {addresses.shipping.city &&
                                                        addresses.shipping
                                                            .city + ','}{' '}
                                                    {addresses.shipping.state}{' '}
                                                    {
                                                        addresses.shipping
                                                            .postcode
                                                    }
                                                </p>
                                                {addresses.shipping.phone && (
                                                    <p>
                                                        <PhoneEnabledIcon />{' '}
                                                        <span>
                                                            {
                                                                addresses
                                                                    .shipping
                                                                    .phone
                                                            }
                                                        </span>
                                                    </p>
                                                )}
                                                {addresses.shipping.email && (
                                                    <p>
                                                        <MarkunreadIcon />{' '}
                                                        <span>
                                                            {
                                                                addresses
                                                                    .shipping
                                                                    .email
                                                            }
                                                        </span>
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                </Col>
                                <Col style={{textAlign: 'right'}}>
                                    {addresses && (
                                        <button
                                            className='btn btn-dark'
                                            onClick={() => {
                                                window.location.href =
                                                    '/dashboard/edit-addresses?action=shipping'
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ProtectedArea(Addresses)
