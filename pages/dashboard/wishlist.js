import Layout from '../../components/Layout'
import React, {useState, useEffect} from 'react'
import {Col, Container, Row, BreadcrumbItem, Breadcrumb} from 'react-bootstrap'
import dashboardStyles from './Dashboard.module.css'
import Menu from '../../components/Dashboard/Menu'
import Link from 'next/link'
import Image from 'next/image'
import ProtectedArea from '../../components/ProtectedArea'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {useGlobalContext} from '../../contextAPI/context'
import {getProductsFromWishlist} from '../../functions/localStorage'
import {useRouter} from 'next/router'

function WishList() {
    const {currentUser} = useGlobalContext()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()
    useEffect(() => {
        // setTimeout(() => {
        setItems(getProductsFromWishlist())
        setLoading(false)
        // }, 300)
    }, [])
    return (
        <Layout>
            <div className={dashboardStyles.dashboard}>
                <h1>WishList</h1>
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
                        <BreadcrumbItem active>Wishlist</BreadcrumbItem>
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
                            <h2>Your WishList</h2>
                            {loading && (
                                <div className={dashboardStyles.skeleton}>
                                    <Skeleton count={5} height={20} />
                                </div>
                            )}
                            {!loading && !error && items.length === 0 && (
                                <div>
                                    <p>
                                        You have not yet joined the wishlist for
                                        any products.
                                    </p>
                                    <Link href='/shop'>Visit shop now!</Link>
                                </div>
                            )}
                            {!loading && !error && items.length > 0 && (
                                <Container
                                    className={`${dashboardStyles.products} mt-5`}
                                >
                                    {items.map(item => (
                                        <Row
                                            key={item.id}
                                            className={`${dashboardStyles.product} d-flex align-items-center justify-content-between text-center mb-3`}
                                            onClick={() => {
                                                router.push(
                                                    `/product/${item.id}`
                                                )
                                            }}
                                        >
                                            <Col
                                                sm={4}
                                                md={2}
                                                className={`${dashboardStyles.productImg} text-left`}
                                            >
                                                <Image
                                                    src={
                                                        item.images
                                                            ? item.images[0].src
                                                            : ''
                                                    }
                                                    alt={item.name}
                                                    width={100}
                                                    height={100}
                                                />
                                            </Col>
                                            <Col
                                                sm={8}
                                                md={10}
                                                className={
                                                    dashboardStyles.productInfo
                                                }
                                            >
                                                <h3>{item.name}</h3>
                                                {/* <p>{item.description}</p> */}
                                            </Col>
                                        </Row>
                                    ))}
                                </Container>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ProtectedArea(WishList)
