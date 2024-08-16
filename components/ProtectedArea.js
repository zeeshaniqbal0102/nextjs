import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {
    getAuthTokenFromLocalStorage,
    logout,
    getAuthTokenFromCookie,
} from '../functions/general'
import jwt from 'jsonwebtoken'
import {Col, Container, Row, Spinner} from 'react-bootstrap'

const ProtectedArea = WrappedComponent => {
    const ProtectedComponentWrapper = props => {
        const Router = useRouter()
        const [verified, setVerified] = useState(false)
        const [verifying, setVerifying] = useState(true)

        useEffect(() => {
            const accessToken = getAuthTokenFromCookie()
            // if no accessToken was found,then we redirect to "/login" page.
            if (!accessToken) {
                Router.replace('/login')
            } else {
                // decoding and verifying the accessToken
                let decoded = jwt.decode(accessToken, {complete: true})
                const isAuthenticated = decoded ? decoded.payload : null
                const isUser =
                    isAuthenticated && isAuthenticated.data.user.id
                        ? true
                        : false
                // if token was verified, setting the state.
                if (isUser) {
                    setVerified(isUser)
                    setVerifying(false)
                } else {
                    // If the token was fraud we first remove it from localStorage and then redirect to "/"
                    // localStorage.removeItem('accessToken')
                    logout()
                    Router.replace('/login')
                }
            }
        }, [])
        if (verifying) {
            return (
                <Container>
                    <Row className='mt-5'>
                        <Col className='text-center'>
                            <Spinner animation='border' role='status'>
                                <span className='visually-hidden'>
                                    Loading...
                                </span>
                            </Spinner>
                        </Col>
                    </Row>
                </Container>
            )
        }
        if (verified) {
            return <WrappedComponent {...props} />
        } else {
            return null
        }
    }
    return ProtectedComponentWrapper

    // return props => {
    //     const Router = useRouter()
    //     const [verified, setVerified] = useState(false)
    //     const [verifying, setVerifying] = useState(true)

    //     useEffect(() => {
    //         const accessToken = getAuthTokenFromLocalStorage()
    //         // if no accessToken was found,then we redirect to "/login" page.
    //         if (!accessToken) {
    //             Router.replace('/login')
    //         } else {
    //             // decoding and verifying the accessToken
    //             let decoded = jwt.decode(accessToken, {complete: true})
    //             const isAuthenticated = decoded ? decoded.payload : null
    //             console.log('Is Authenticated: ', isAuthenticated)
    //             const isUser =
    //                 isAuthenticated && isAuthenticated.data.user.id
    //                     ? true
    //                     : false
    //             console.log('Is User: ', isUser)
    //             // if token was verified, setting the state.
    //             if (isUser) {
    //                 setVerified(isUser)
    //                 setVerifying(false)
    //             } else {
    //                 // If the token was fraud we first remove it from localStorage and then redirect to "/"
    //                 // localStorage.removeItem('accessToken')
    //                 logout()
    //                 Router.replace('/login')
    //             }
    //         }
    //     }, [])
    //     if (verifying) {
    //         return (
    //             <Container>
    //                 <Row className='mt-5'>
    //                     <Col className='text-center'>
    //                         <Spinner animation='border' role='status'>
    //                             <span className='visually-hidden'>
    //                                 Loading...
    //                             </span>
    //                         </Spinner>
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         )
    //     }
    //     if (verified) {
    //         return <WrappedComponent {...props} />
    //     } else {
    //         return null
    //     }
    // }
}

export default ProtectedArea
