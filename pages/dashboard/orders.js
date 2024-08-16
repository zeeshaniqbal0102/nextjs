import Layout from '../../components/Layout'
import React, {useState, useEffect} from 'react'
import {Col, Container, Row, BreadcrumbItem, Breadcrumb} from 'react-bootstrap'
import dashboardStyles from './Dashboard.module.css'
import orderStyles from './orders.module.css'
import Menu from '../../components/Dashboard/Menu'
import Link from 'next/link'
import ProtectedArea from '../../components/ProtectedArea'
import axios from 'axios'
import {useGlobalContext} from '../../contextAPI/context'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {isoDateToDateString} from '../../functions/general'

function Orders() {
    const {currentUser} = useGlobalContext()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchOrders = async () => {
        setLoading(true)
        setError(null)
        try {
            if (currentUser && currentUser.id) {
                const response = await axios.get(
                    `/api/dashboard/orders?customer=${currentUser.id}`
                )
                const {data} = await response.data
                setOrders(data)
                setLoading(false)
                setError(null)
            } else {
                setError('No user found')
                setLoading(false)
            }
        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <Layout>
            <div className={dashboardStyles.dashboard}>
                <h1>Orders</h1>
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
                        <BreadcrumbItem active>Orders</BreadcrumbItem>
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
                            <h2>Manage Orders</h2>
                            {loading && (
                                <div className={orderStyles.skeleton}>
                                    <Skeleton count={5} />
                                </div>
                            )}
                            {error && (
                                <p className='alert alert-danger'>{error}</p>
                            )}
                            {!loading && !error && orders && orders.length > 0 && (
                                <table className={orderStyles.table}>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => {
                                            return (
                                                <tr key={order.id}>
                                                    <td>
                                                        <Link
                                                            href={`/dashboard/order/${order.id}`}
                                                        >
                                                            <a>
                                                                #{order.number}
                                                            </a>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {isoDateToDateString(
                                                            order.date_created
                                                        )}
                                                    </td>
                                                    <td>
                                                        {order.status ==
                                                        'completed'
                                                            ? 'Shipped'
                                                            : order.status}
                                                    </td>
                                                    <td>
                                                        ${order.total} for{' '}
                                                        {
                                                            order.line_items
                                                                .length
                                                        }{' '}
                                                        items
                                                    </td>
                                                    <td>
                                                        <Link
                                                            href={`/dashboard/order/${order.id}`}
                                                        >
                                                            <button
                                                                className={`${dashboardStyles.btnAction} btn btn-sm btn-primary`}
                                                                // onClick={() => {
                                                                //     window.location.href = `/dashboard/order/${order.id}`
                                                                // }}
                                                            >
                                                                View
                                                            </button>
                                                        </Link>
                                                        <Link href='#'>
                                                            <button
                                                                className={`${dashboardStyles.btnAction} btn btn-sm btn-primary`}
                                                            >
                                                                Track
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            )}
                            {!loading &&
                                !error &&
                                orders &&
                                orders.length === 0 && (
                                    <>
                                        <p className='mt-3 alert alert-danger'>
                                            No recent orders found,{' '}
                                            <Link href='/shop'>
                                                Start Shopping!
                                            </Link>
                                        </p>
                                    </>
                                )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ProtectedArea(Orders)
