import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import {AppProvider} from '../contextAPI/context'

NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
    showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({Component, pageProps}) {
    return (
        <AppProvider>
            <Component {...pageProps} />
        </AppProvider>
    )
}

export default MyApp
