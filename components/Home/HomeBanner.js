import {Col, Container, Row} from 'react-bootstrap'
import Image from 'next/image'
import homeBannerStyles from './HomeBanner.module.css'

function HomeBanner() {
    return (
        <Container className={`${homeBannerStyles.homeBanner} text-center`}>
            <Row>
                <Col>
                    <h1
                        className={`${homeBannerStyles.homeBannerTitle} textDark`}
                    >
                        The Devil is in the Details
                    </h1>
                    <p className={homeBannerStyles.bannerDesc}>
                    project-name is where timeless aesthetics meets
                        uncompromised functionality. We craft premium products
                        with an unwavering attention to detail.
                    </p>
                    <Row className='iconBoxWrapper'>
                        <Col className='iconBox'>
                            <Image
                                src='/images/customer-service.png'
                                width={27}
                                height={30}
                                className='iconBoxImage'
                                alt='Customer Service'
                            />
                            <h5 className='iconBoxHeading'>Customer service</h5>
                            <p className='iconBoxDesc'>
                                Live chat and email replies within 24h
                            </p>
                        </Col>
                        <Col className='iconBox'>
                            <Image
                                src='/images/secure-payment.png'
                                width={27}
                                height={30}
                                className='iconBoxImage'
                                alt='Secure Payment'
                            />
                            <h5 className='iconBoxHeading'>Secure Payments</h5>
                            <p className='iconBoxDesc'>
                                All payment methods are secure and trusted
                            </p>
                        </Col>
                        <Col className='iconBox'>
                            <Image
                                src='/images/quality-products.png'
                                width={27}
                                height={30}
                                className='iconBoxImage'
                                alt='Quality Products'
                            />
                            <h5 className='iconBoxHeading'>Quality Products</h5>
                            <p className='iconBoxDesc'>
                                Premium materials and machining
                            </p>
                        </Col>
                        <Col className='iconBox'>
                            <Image
                                src='/images/fast-shipping.png'
                                width={27}
                                height={30}
                                className='iconBoxImage'
                                alt='Fast Shipping'
                            />
                            <h5 className='iconBoxHeading'>Fast Shipping</h5>
                            <p className='iconBoxDesc'>
                                Worldwide shipping with tracking
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeBanner
