import Layout from '../../components/Layout'
import React, {useState, useEffect} from 'react'
import {
    Col,
    Container,
    Row,
    BreadcrumbItem,
    Breadcrumb,
    Form,
    Button,
} from 'react-bootstrap'
import dashboardStyles from './Dashboard.module.css'
import orderSingleStyles from '../dashboard/order/[id]/order.module.css'
import orderStyles from '../../styles/orderConfirmation.module.css'
import Menu from '../../components/Dashboard/Menu'
import Link from 'next/link'
import axios from 'axios'
import {useGlobalContext} from '../../contextAPI/context'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProtectedArea from '../../components/ProtectedArea'
import {useFormik} from 'formik'
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector'

// get query params with js if window is defined
let queryParams = {}
if (typeof window !== 'undefined') {
    queryParams = window
        ? window.location.search
              .replace('?', '')
              .split('&')
              .reduce((acc, curr) => {
                  const [key, value] = curr.split('=')
                  acc[key] = value
                  return acc
              }, {})
        : {}
}

function EditAddresses() {
    const [addresses, setAddresses] = useState(false)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [updatingError, setUpdatingError] = useState(false)
    const [updatingSuccess, setUpdatingSuccess] = useState(false)
    const [error, setError] = useState(false)
    const {currentUser} = useGlobalContext()
    const action = queryParams && queryParams.action
    let formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
        },
        enableReinitialize: true,
    })
    // if (action === 'billing' || action === 'shipping') {
    const fetchAddresses = async () => {
        setLoading(true)
        setError(false)
        if (currentUser && currentUser.id) {
            try {
                const response = await axios.get(
                    `/api/dashboard/addresses?customer=${currentUser.id}`
                )
                const {data} = await response.data
                setAddresses(data)
                // console.log('addresses', data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setLoading(false)
                // setError(error.response.data.message)
                setError(error.response.data.message)
                // console.log('Error', error.response.data)
            }
        }
    }

    const updateAddress = async () => {
        setUpdating(true)
        setUpdatingSuccess(false)
        setUpdatingError(false)
        if (currentUser && currentUser.id) {
            const dataToUpdate = {
                customer: currentUser.id,
                address: {
                    [action]: {...formik.values},
                },
            }
            // console.log('dataToUpdate', dataToUpdate)
            try {
                const response = await axios.post(
                    `/api/dashboard/addresses`,
                    dataToUpdate
                )
                const {data, message} = await response.data
                setAddresses(data)
                // console.log('addresses', data)
                setUpdating(false)
                setUpdatingSuccess(message)
                setUpdatingError(false)
            } catch (error) {
                setUpdating(false)
                setUpdatingSuccess(false)
                // setError(error.response.data.message)
                setUpdatingError(error.response.data.message)
                // console.log('Error', error.response.data)
            }
        }
    }

    useEffect(() => {
        fetchAddresses()
    }, [currentUser])

    formik = useFormik({
        initialValues: addresses[action],
        enableReinitialize: true,
        onSubmit: values => {
            updateAddress()
            // alert(JSON.stringify(values, null, 2))
        },
    })
    // }

    return (
        <Layout>
            {action === 'billing' || action === 'shipping' ? (
                <div className={dashboardStyles.dashboard}>
                    <h1>
                        Edit{' '}
                        <span style={{textTransform: 'capitalize'}}>
                            {action}
                        </span>{' '}
                        Address
                    </h1>
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
                            <BreadcrumbItem>
                                <Link href='/dashboard/addresses'>
                                    <a>Addresses</a>
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Edit{' '}
                                <span style={{textTransform: 'capitalize'}}>
                                    {action}
                                </span>
                            </BreadcrumbItem>
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
                                <h3>
                                    <span style={{textTransform: 'capitalize'}}>
                                        {action} Address
                                    </span>
                                </h3>
                                {error && (
                                    <div className='alert alert-danger'>
                                        {error}
                                    </div>
                                )}
                                <Row className='mt-3'>
                                    {loading && (
                                        <Skeleton
                                            className='mb-3'
                                            count={10}
                                            height={50}
                                        />
                                    )}
                                    {!loading && !error && addresses && (
                                        <Form onSubmit={formik.handleSubmit}>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='first_name'
                                            >
                                                <Form.Label>
                                                    First Name:{' '}
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='First Name'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.first_name
                                                    }
                                                    name='first_name'
                                                    size='lg'
                                                    required={true}
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='last_name'
                                            >
                                                <Form.Label>
                                                    Last Name:{' '}
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Last Name'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.last_name
                                                    }
                                                    name='last_name'
                                                    size='lg'
                                                    required={true}
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='phone'
                                            >
                                                <Form.Label>
                                                    Phone{' '}
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Phone'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={formik.values.phone}
                                                    name='phone'
                                                    size='lg'
                                                    required={true}
                                                />
                                            </Form.Group>
                                            {action !== 'shipping' && (
                                                <Form.Group
                                                    className='mb-3'
                                                    controlId='email'
                                                >
                                                    <Form.Label>
                                                        Email address{' '}
                                                        <span className='text-danger'>
                                                            *
                                                        </span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type='email'
                                                        placeholder='Email address'
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values.email
                                                                ? formik.values
                                                                      .email
                                                                : addresses.email
                                                        }
                                                        name='email'
                                                        size='lg'
                                                        required={true}
                                                    />
                                                </Form.Group>
                                            )}
                                            <Form.Group
                                                className='mb-3'
                                                controlId='address_1'
                                            >
                                                <Form.Label>
                                                    Street address{' '}
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Street address'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.address_1
                                                    }
                                                    name='address_1'
                                                    size='lg'
                                                    required={true}
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='address_2'
                                            >
                                                <Form.Label>
                                                    ADDRESS 2 (OPTIONAL){' '}
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Apartment, suite, unit, etc. (optional)'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.address_2
                                                    }
                                                    name='address_2'
                                                    size='lg'
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='city'
                                            >
                                                <Form.Label>
                                                    City{' '}
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='City'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={formik.values.city}
                                                    name='city'
                                                    size='lg'
                                                    required={true}
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='postcode'
                                            >
                                                <Form.Label>
                                                    Zip Code{' '}
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Zip Code'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.postcode
                                                    }
                                                    name='postcode'
                                                    size='lg'
                                                    required={true}
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='country'
                                            >
                                                <Form.Label>
                                                    COUNTRY / REGION{' '}
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <CountryDropdown
                                                    value={
                                                        formik.values.country
                                                    }
                                                    valueType='short'
                                                    // showDefaultOption={false}
                                                    onChange={val => {
                                                        formik.setFieldValue(
                                                            'country',
                                                            val
                                                        )
                                                    }}
                                                    name='country'
                                                    id='country'
                                                    classes='form-control form-control-lg'
                                                    required={true}
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='state'
                                            >
                                                <Form.Label>
                                                    State{' '}
                                                    <span className='text-danger'>
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <RegionDropdown
                                                    country={
                                                        formik.values.country
                                                    }
                                                    value={formik.values.state}
                                                    countryValueType='short
                                                        '
                                                    // showDefaultOption={false}
                                                    defaultOptionLabel='State *'
                                                    valueType='short'
                                                    onChange={val => {
                                                        formik.setFieldValue(
                                                            'state',
                                                            val
                                                        )
                                                    }}
                                                    name='state'
                                                    id='state'
                                                    classes='form-control form-control-lg'
                                                    required={true}
                                                />
                                            </Form.Group>
                                            <Button
                                                size='lg'
                                                variant='danger'
                                                type='submit'
                                                className='w-100'
                                                disabled={updating}
                                            >
                                                {updating
                                                    ? 'Updating...'
                                                    : 'Save Address'}
                                            </Button>
                                            {updatingError && (
                                                <div className='mt-4 alert alert-danger'>
                                                    {updatingError}
                                                </div>
                                            )}
                                            {updatingSuccess && (
                                                <div className='mt-4 alert alert-success'>
                                                    {updatingSuccess}
                                                </div>
                                            )}
                                        </Form>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ) : (
                <div className={dashboardStyles.dashboard}>
                    <h1>Invalid Action</h1>
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
                            <BreadcrumbItem>
                                <Link href='/dashboard/addresses'>
                                    <a>Addresses</a>
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Edit</BreadcrumbItem>
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
                                <h4 className='alert alert-danger'>
                                    Invalid Action
                                </h4>
                                <Link href='/dashboard/addresses'>
                                    Back to Addresses
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </Layout>
    )
}

export default ProtectedArea(EditAddresses)
