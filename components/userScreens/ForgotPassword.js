import React, {useState} from 'react'
import loginStyles from './Login.module.css'
import Link from 'next/link'
import {Container, Spinner} from 'react-bootstrap'
import axios from 'axios'
import {useGlobalContext} from '../../contextAPI/context'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleInputChange = e => {
        setEmail(e.target.value)
    }
    const handleSubmit = async e => {
        e.preventDefault()
        setError(false)
        setSuccessMessage(false)
        if (!email) {
            setError('Please enter your username or email')
            return
        }
        setLoading(true)
        try {
            const response = await axios.post(`/api/forgot-password`, {email})
            const {message, data} = await response.data
            // console.log('Data', data)
            setError(false)
            setLoading(false)
            setEmail('')
            setSuccessMessage(message)
        } catch (error) {
            let errorMessage = error.response.data.message
            setError(errorMessage)
            setLoading(false)
            setSuccessMessage(false)
            // console.log('error.response', error)
            // console.log('error.response', error.response.data)
        }
    }

    return (
        <div className={loginStyles.login}>
            <h1>Forgot Password</h1>
            <Container className={loginStyles.loginContainer}>
                <div className={`${loginStyles.loginForm} pt-5`}>
                    {error && (
                        <div>
                            <p className='alert alert-danger'>{error}</p>
                        </div>
                    )}
                    {successMessage && (
                        <div>
                            <p className='alert alert-success'>
                                {successMessage}
                            </p>
                        </div>
                    )}
                    <div className='mb-4 text-start'>
                        Lost your password? Please enter your username or email
                        address. You will receive a link to create a new
                        password via email.
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={loginStyles.loginFormGroup}>
                            {/* <label htmlFor='username'>Username</label> */}
                            <input
                                type='text'
                                className={`${loginStyles.loginFormControl} mrInput`}
                                id='email'
                                placeholder='Username or email'
                                // required
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={loginStyles.loginFormGroup}>
                            <button
                                type='submit'
                                className={`${loginStyles.loginFormControl} mrInput ${loginStyles.btnSubmit}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner
                                            as='span'
                                            animation='grow'
                                            size='sm'
                                            role='status'
                                            aria-hidden='true'
                                        />
                                        Processing...
                                    </>
                                ) : (
                                    'Reset Password'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <div className={loginStyles.forgotNotice}></div>
                <div className={loginStyles.loginLinks}>
                    <p>
                        <Link href='/login'>
                            <a>Back to login page</a>
                        </Link>
                    </p>

                    {/* <Link href='/forgot-password'>
                        <a>Forgot Password</a>
                    </Link> */}
                </div>
                {/* <div className={loginStyles.loginLinks}>
                    <Link href='/register'>
                        <a>Register</a>
                    </Link>
                    <Link href='/login'>
                        <a>Login</a>
                    </Link>
                </div> */}
            </Container>
        </div>
    )
}

export default ForgotPassword
