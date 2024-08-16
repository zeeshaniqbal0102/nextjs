import Layout from '../../components/Layout'
import React from 'react'
import {Col, Container, Row, BreadcrumbItem, Breadcrumb} from 'react-bootstrap'
import dashboardStyles from './Dashboard.module.css'
import Menu from '../../components/Dashboard/Menu'
import Link from 'next/link'
import {useGlobalContext} from '../../contextAPI/context'
import ProtectedArea from '../../components/ProtectedArea'

function Logout() {
    const {logoutUser} = useGlobalContext()
    return (
        <Layout>
            <div className={dashboardStyles.dashboard}>
                <h1>Logout</h1>
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
                        <BreadcrumbItem active>Logout</BreadcrumbItem>
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
                            <h3>Are you sure to logout?</h3>
                            <div
                                className={dashboardStyles.btnRed}
                                onClick={logoutUser}
                            >
                                Confirm
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ProtectedArea(Logout)
