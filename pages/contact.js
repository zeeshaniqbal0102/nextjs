import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'
import {Col, Container, Row, Breadcrumb, BreadcrumbItem} from 'react-bootstrap'
import Layout from '../components/Layout'
import {createNotification} from '../functions/utils'
import {NotificationContainer} from 'react-notifications'
import contactStyles from '../styles/contact.module.css'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'

function Contact() {
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [sendingForm, setSendingForm] = useState(false)
    const [formError, setFormError] = useState({message: ''})
    const [recaptcha, setRecaptcha] = useState(false)
    const [isCaptchaValid, setIsCaptchaValid] = useState(false)

    const handleFormFiledsChange = e => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        })
    }

    const handleRecaptchaChange = value => {
        // console.log('value', value)
        setRecaptcha(value)
        setIsCaptchaValid(true)
    }
    const handleRecaptchaError = () => {
        createNotification('error', 'Please verify that you are not a robot.')
        setIsCaptchaValid(false)
        setRecaptcha(false)
    }

    const handleFormSubmit = async e => {
        setSendingForm(false)
        e.preventDefault()
        if (isCaptchaValid) {
            if (!formFields.name) {
                createNotification('error', 'Please enter your name')
                return
            }
            if (!formFields.email) {
                createNotification('error', 'Please enter your email')
                return
            }
            if (!formFields.message) {
                createNotification('error', 'Please enter your message')
                return
            }
            // send post axios api call
            const dataToSend = {
                'your-name': formFields.name,
                'your-email': formFields.email,
                'your-message': formFields.message,
            }
            setSendingForm(true)
            try {
                setFormError({message: ''})
                const response = await axios.post(`/api/contact`, dataToSend)
                const data = await response.data.data
                // console.log('Data', data)
                setFormError({message: data.message})
                setSendingForm(false)
                setFormFields({
                    name: '',
                    email: '',
                    message: '',
                })
                // clear recaptcha
                setIsCaptchaValid(false)
                setRecaptcha(false)
            } catch (error) {
                // console.log(error)
                setFormError({message: `There was an error`})
                setSendingForm(false)
                setIsCaptchaValid(false)
                setRecaptcha(false)
                // console.log('error', error)
            }
        } else {
            handleRecaptchaError()
        }
    }

    return (
        <Layout>
            <Container className={contactStyles.container}>
                <Row className='mt-3 mb-3'>
                    <Col className={contactStyles.breadCol}>
                        {/* breadcrumb */}
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link href='/'>
                                    <a className='textDark'>Home</a>
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Contact</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row className={contactStyles.contactRow}>
                    <Col sm={12} lg={6} className={contactStyles.leftCol}>
                        <Image
                            src='/images/contact-page.png'
                            width={800}
                            height={700}
                            alt='Contact Image'
                        />
                    </Col>
                    <Col sm={12} lg={6} className={contactStyles.rightCol}>
                        <div className={contactStyles.formTextDiv}>
                            <p>
                                <strong>
                                    You can track your order or find shipping
                                    information{' '}
                                    <Link href='/shipping-information'>
                                        HERE
                                    </Link>
                                </strong>
                            </p>
                            <p>
                                Questions? Concerns? Curious about a product?
                                Need help navigating the site? Want to know
                                about upcoming projects? We would love to hear
                                from you! The team at project-name is ready,
                                willing, and able to provide you with the
                                support you need and the service you deserve.
                                Drop us a line and we will respond to your
                                inquiry within 24 hours.
                            </p>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col
                                    xs={12}
                                    sm={6}
                                    className={contactStyles.formGroup}
                                >
                                    <input
                                        type='text'
                                        className={contactStyles.formControl}
                                        id='name'
                                        name='name'
                                        placeholder='Name *'
                                        required
                                        value={formFields.name}
                                        onChange={handleFormFiledsChange}
                                    />
                                </Col>
                                <Col
                                    xs={12}
                                    sm={6}
                                    className={contactStyles.formGroup}
                                >
                                    <input
                                        type='email'
                                        name='email'
                                        className={contactStyles.formControl}
                                        id='email'
                                        placeholder='Email *'
                                        required
                                        value={formFields.email}
                                        onChange={handleFormFiledsChange}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className={contactStyles.formGroup}>
                                    <textarea
                                        className={contactStyles.formControl}
                                        id='message'
                                        name='message'
                                        rows='7'
                                        placeholder='Message...'
                                        required
                                        value={formFields.message}
                                        onChange={handleFormFiledsChange}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col className={contactStyles.formGroup}>
                                    <ReCAPTCHA
                                        sitekey={
                                            process.env.REACT_APP_RECAPTCHA_KEY
                                        }
                                        onChange={handleRecaptchaChange}
                                        onErrored={handleRecaptchaError}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button
                                        type='submit'
                                        className={contactStyles.btnSubmit}
                                        disabled={sendingForm}
                                    >
                                        {sendingForm ? 'Sending...' : 'Send'}
                                    </button>
                                </Col>
                            </Row>
                            {formError.message && (
                                <Row className='mt-3'>
                                    <Col>
                                        <p>{formError.message}</p>
                                    </Col>
                                </Row>
                            )}
                        </form>
                    </Col>
                </Row>
            </Container>
            <NotificationContainer />
        </Layout>
    )
}

export default Contact
