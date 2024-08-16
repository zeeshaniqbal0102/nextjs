import Link from 'next/link'
import Image from 'next/image'
import {Col, Container, Row} from 'react-bootstrap'
import footerStyles from '../styles/Footer.module.css'

const paymentIcons = [
    {
        id: 1,
        name: 'american express',
        image: '/images/american-express.png',
    },
    {
        id: 2,
        name: 'visa',
        image: '/images/visa.png',
    },
    {
        id: 3,
        name: 'mastercard',
        image: '/images/mastercard.png',
    },
    {
        id: 4,
        name: 'google-pay',
        image: '/images/google-pay.png',
    },
    // {
    //     id: 5,
    //     name: 'paypal',
    //     image: '/images/paypal.png',
    // },
]

const Footer = () => {
    return (
        <footer className={footerStyles.footer}>
            <Container>
                <Row>
                    <Col sm={12} lg={4} className={footerStyles.footerLeft}>
                        <p>© 2022 project-name. All Rights Reserved.</p>
                    </Col>
                    <Col sm={12} lg={4} className={footerStyles.footerMiddle}>
                        {/* 5 images width:76, height: 45 */}
                        {paymentIcons.map(icon => (
                            <li key={icon.id}>
                                <Image
                                    src={icon.image}
                                    alt={icon.name}
                                    width={76}
                                    height={45}
                                />
                            </li>
                        ))}
                        {/* <li>
                            <Image
                                src='/images/american-express.png'
                                alt='american express'
                                width={76}
                                height={45}
                            />
                        </li>
                        <li>
                            <Image
                                src='/images/visa.png'
                                alt='visa'
                                width={76}
                                height={45}
                            />
                        </li>
                        <li>
                            <Image
                                src='/images/mastercard.png'
                                alt='mastercard'
                                width={76}
                                height={45}
                            />
                        </li>
                        <li>
                            <Image
                                src='/images/paypal.png'
                                alt='paypal'
                                width={76}
                                height={45}
                            />
                        </li>
                        <li>
                            <Image
                                src='/images/google-pay.png'
                                alt='google-pay'
                                width={76}
                                height={45}
                            />
                        </li> */}
                    </Col>
                    <Col sm={12} lg={4} className={footerStyles.footerRight}>
                        {/* Footer Links */}
                        <li>
                            <Link href='/terms-conditions'>
                                <a>T & C</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/privacy-policy'>
                                <a>Privacy</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/returns-policy'>
                                <a>Returns</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/sitemap'>
                                <a>Sitemap</a>
                            </Link>
                        </li>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
