import Nav from './Nav'
import Meta from './Meta'
import Footer from './Footer'
import NewsLetter from './NewsLetter'
import styles from '../styles/Layout.module.css'

const dontShowNewsLetterInPages = [
    '/cart',
    '/checkout',
    '/order-confirmation',
    '/dashboard',
]
// get the current page
const currentPage =
    typeof window !== 'undefined' ? window.location.pathname : ''

const Layout = ({children}) => {
    return (
        <>
            <Meta />
            <Nav />
            <main className={styles.main}>{children}</main>
            {dontShowNewsLetterInPages.indexOf(currentPage) === -1 && (
                <NewsLetter />
            )}
            <Footer />
        </>
    )
}

export default Layout
