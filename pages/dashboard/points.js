import Layout from '../../components/Layout'
import React, {useState, useEffect} from 'react'
import {Col, Container, Row, BreadcrumbItem, Breadcrumb} from 'react-bootstrap'
import dashboardStyles from './Dashboard.module.css'
import Menu from '../../components/Dashboard/Menu'
import Link from 'next/link'
import ProtectedArea from '../../components/ProtectedArea'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {useGlobalContext} from '../../contextAPI/context'

function Points() {
    const {currentUser} = useGlobalContext()
    const [points, setPoints] = useState(false)
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
                setPoints(getPoints(data))
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

    const getPoints = data => {
        if (data && data.length > 0) {
            return data.reduce((acc, curr) => {
                let meta = curr.meta_data
                if (meta && meta.length > 0) {
                    let point = meta.find(
                        item => item.key === '_wc_points_earned'
                    )
                    if (point) {
                        return acc + parseInt(point.value)
                    }
                }
                return acc
            }, 0)
        }
        return 0
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <Layout>
            <div className={dashboardStyles.dashboard}>
                <h1>Points</h1>
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
                        <BreadcrumbItem active>Points</BreadcrumbItem>
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
                            <h2>Points</h2>
                            {loading && (
                                <div className={dashboardStyles.skeleton}>
                                    <Skeleton count={1} />
                                </div>
                            )}
                            {error && (
                                <p className='alert alert-danger'>{error}</p>
                            )}
                            {!loading && !error && orders && (
                                <div className='mt-3'>
                                    <p>
                                        You have <strong>{points}</strong>{' '}
                                        Points
                                    </p>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ProtectedArea(Points)
