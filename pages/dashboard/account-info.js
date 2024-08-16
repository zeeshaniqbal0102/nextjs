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
import Menu from '../../components/Dashboard/Menu'
import Link from 'next/link'
import ProtectedArea from '../../components/ProtectedArea'
import axios from 'axios'
import {useGlobalContext} from '../../contextAPI/context'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function AccountInfo() {
    const [customer, setCustomer] = useState(false)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [updatingError, setUpdatingError] = useState(false)
    const [updatingSuccess, setUpdatingSuccess] = useState(false)
    const [error, setError] = useState(false)
    const {currentUser} = useGlobalContext()
    const [formFields, setFormFields] = useState({
        first_name: '',
        last_name: '',
        email: '',
    })
    const handleChange = e => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        })
    }
    const fetchUser = async () => {
        setLoading(true)
        setError(false)
        if (currentUser && currentUser.id) {
            try {
                const response = await axios.get(
                    `/api/dashboard/addresses?customer=${currentUser.id}`
                )
                const {data} = await response.data
                setCustomer(data)
                // console.log('Customer', data)
                setFormFields({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                })
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

    const handleSubmit = async e => {
        e.preventDefault()
        setUpdating(true)
        setUpdatingSuccess(false)
        setUpdatingError(false)
        if (currentUser && currentUser.id) {
            const dataToUpdate = {
                customer: currentUser.id,
                data: {...formFields},
            }
            // console.log('dataToUpdate', dataToUpdate)
            try {
                const response = await axios.post(
                    `/api/dashboard/update-profile`,
                    dataToUpdate
                )
                const {data, message} = await response.data
                setCustomer(data)
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
        fetchUser()
    }, [currentUser])

    return (
        <Layout>
            <div className={dashboardStyles.dashboard}>
                <h1>Account Info</h1>
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
                        <BreadcrumbItem active>Account Info</BreadcrumbItem>
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
                            <h2 className='mb-4'>Manage Account details</h2>
                            {loading && (
                                <Skeleton
                                    className='mb-3'
                                    count={5}
                                    height={50}
                                />
                            )}
                            {!loading && !error && customer && (
                                <Form onSubmit={handleSubmit}>
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
                                            onChange={handleChange}
                                            value={formFields.first_name}
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
                                            onChange={handleChange}
                                            value={formFields.last_name}
                                            name='last_name'
                                            size='lg'
                                            required={true}
                                        />
                                    </Form.Group>
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
                                            onChange={handleChange}
                                            value={formFields.email}
                                            name='email'
                                            size='lg'
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
                                            ? 'Saving...'
                                            : 'Save Changes'}
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ProtectedArea(AccountInfo)
