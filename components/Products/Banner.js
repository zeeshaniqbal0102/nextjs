import Link from 'next/link'
import React from 'react'
import {Breadcrumb, BreadcrumbItem, Col, Container, Row} from 'react-bootstrap'
import bannerStyles from './Banner.module.css'

function Banner({text, page}) {
    return (
        <section className={bannerStyles.banner}>
            <Container>
                <Row>
                    <Col>
                        <p className={bannerStyles.bannerText}>{text}</p>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        {/* breadcrumb */}
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link href='/'>
                                    <a className='textDark'>Home</a>
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{page}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner
