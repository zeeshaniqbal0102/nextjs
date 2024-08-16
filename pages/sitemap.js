import Link from 'next/link'
import React from 'react'
import {Col, Container, Row, Breadcrumb, BreadcrumbItem} from 'react-bootstrap'
import Layout from '../components/Layout'
import shippingStyles from '../styles/shipping.module.css'

const pages = [
    {
        title: 'Homepage',
        href: '/',
    },
    {
        title: 'All products',
        href: '/shop',
    },
    {
        title: 'Knives',
        href: '/knives',
    },
    {
        title: 'Fidget',
        href: '/fidget',
    },
    {
        title: 'EDC',
        href: '/edc',
    },
    {
        title: 'Checkout',
        href: '/checkout',
    },
    {
        title: 'Contact Us',
        href: '/contact',
    },
    {
        title: 'My Account',
        href: '/dashboard',
    },
    {
        title: 'Payment Confirmation',
        href: '/order-confirmation',
    },
    {
        title: 'Privacy Policy',
        href: '/privacy-policy',
    },
    {
        title: 'Returns Policy',
        href: '/returns-policy',
    },
    {
        title: 'Terms & Conditions',
        href: '/terms-conditions',
    },
    {
        title: 'Ship Info/ Track Order',
        href: '/shipping-information',
    },
    {
        title: 'Sitemap',
        href: '/sitemap',
    },
]

function Sitemap() {
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
                            <BreadcrumbItem active>Sitemap</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col className={shippingStyles.shipInfoText}>
                        <ul>
                            {pages &&
                                pages.length > 0 &&
                                pages.map((page, index) => {
                                    return (
                                        <li key={index}>
                                            <Link href={page.href}>
                                                <a>{page.title}</a>
                                            </Link>
                                        </li>
                                    )
                                })}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Sitemap
