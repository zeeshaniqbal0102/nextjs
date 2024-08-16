import Layout from '../../components/Layout'
import React from 'react'
import {Col, Container, Row, BreadcrumbItem, Breadcrumb} from 'react-bootstrap'
import dashboardStyles from './Dashboard.module.css'
import Menu from '../../components/Dashboard/Menu'
import Link from 'next/link'
import ProtectedArea from '../../components/ProtectedArea'
import {useGlobalContext} from '../../contextAPI/context'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import SettingsIcon from '@material-ui/icons/Settings'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FavoriteIcon from '@material-ui/icons/Favorite'

function Dashboard() {
    const {currentUser} = useGlobalContext()
    return (
        <Layout>
            <div className={dashboardStyles.dashboard}>
                <h1>Dashboard</h1>
                <div className={dashboardStyles.breadcrumb}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link href='/'>
                                <a>Home</a>
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Dashboard</BreadcrumbItem>
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
                            <h2>Dashboard</h2>
                            <p>
                                Hello{' '}
                                <strong>
                                    {currentUser &&
                                        currentUser.user_display_name}
                                </strong>{' '}
                                (not{' '}
                                {currentUser && currentUser.user_display_name}?
                                <Link href='dashboard/logout'> Sign out</Link>)
                            </p>
                            <p>
                                From your account dashboard you can view your{' '}
                                <Link href='/dashboard/orders'>
                                    recent orders
                                </Link>
                                , manage your{' '}
                                <Link href='/dashboard/addresses'>
                                    shipping and billing addresses
                                </Link>{' '}
                                and{' '}
                                <Link href='/dashboard/account-info'>
                                    edit your password and account details
                                </Link>
                                .
                            </p>
                            <section className={dashboardStyles.gridContainer}>
                                <Row className={dashboardStyles.gridRow}>
                                    <Col
                                        sm={3}
                                        className={dashboardStyles.gridCol}
                                    >
                                        <ShoppingCartIcon />
                                        <p>
                                            <Link href='/dashboard/orders'>
                                                Orders
                                            </Link>
                                        </p>
                                    </Col>
                                    <Col
                                        sm={3}
                                        className={dashboardStyles.gridCol}
                                    >
                                        <LocationOnIcon />
                                        <p>
                                            <Link href='/dashboard/addresses'>
                                                Addresses
                                            </Link>
                                        </p>
                                    </Col>
                                    <Col
                                        sm={3}
                                        className={dashboardStyles.gridCol}
                                    >
                                        <PersonIcon />
                                        <p>
                                            <Link href='/dashboard/account-info'>
                                                Account details
                                            </Link>
                                        </p>
                                    </Col>
                                </Row>
                                <Row className={dashboardStyles.gridRow}>
                                    <Col
                                        sm={3}
                                        className={dashboardStyles.gridCol}
                                    >
                                        <SettingsIcon />
                                        <p>
                                            <Link href='/dashboard/points'>
                                                Points
                                            </Link>
                                        </p>
                                    </Col>
                                    <Col
                                        sm={3}
                                        className={dashboardStyles.gridCol}
                                    >
                                        <FavoriteIcon />
                                        <p>
                                            <Link href='/dashboard/wishlist'>
                                                Your Wishlist
                                            </Link>
                                        </p>
                                    </Col>
                                    <Col
                                        sm={3}
                                        className={dashboardStyles.gridCol}
                                    >
                                        <ExitToAppIcon />
                                        <p>
                                            <Link href='/dashboard/logout'>
                                                Logout
                                            </Link>
                                        </p>
                                    </Col>
                                </Row>
                            </section>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ProtectedArea(Dashboard)
