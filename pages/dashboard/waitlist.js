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

function Waitlist() {
    const {currentUser} = useGlobalContext()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])
    return (
        <Layout>
            <div className={dashboardStyles.dashboard}>
                <h1>Waitlists</h1>
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
                        <BreadcrumbItem active>Waitlists</BreadcrumbItem>
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
                            <h2>Your Waitlists</h2>
                            {loading && (
                                <div className={dashboardStyles.skeleton}>
                                    <Skeleton count={5} height={20} />
                                </div>
                            )}
                            {!loading && (
                                <div>
                                    <p>
                                        You have not yet joined the waitlist for
                                        any products.
                                    </p>
                                    <Link href='/shop'>Visit shop now!</Link>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ProtectedArea(Waitlist)
