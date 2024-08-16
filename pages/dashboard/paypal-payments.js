import Layout from '../../components/Layout'
import React from 'react'
import {Col, Container, Row, BreadcrumbItem, Breadcrumb} from 'react-bootstrap'
import dashboardStyles from './Dashboard.module.css'
import Menu from '../../components/Dashboard/Menu'
import Link from 'next/link'
import ProtectedArea from '../../components/ProtectedArea'

function PaypalPayments() {
    return (
        <Layout>
            <div className={dashboardStyles.dashboard}>
                <h1>Paypal Payments</h1>
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
                        <BreadcrumbItem active>Paypal Payments</BreadcrumbItem>
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
                            <h2>Paypal Payments Content goes here</h2>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Fugit mollitia esse velit
                                molestias ab totam quaerat aut vitae incidunt
                                maxime perspiciatis sequi, eum eius voluptatem
                                reiciendis repellendus animi! Tempora,
                                accusantium.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ProtectedArea(PaypalPayments)
