import Link from 'next/link'
import React from 'react'
import menuStyles from './Menu.module.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import SettingsIcon from '@material-ui/icons/Settings'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const dashboardLinks = [
    {
        href: '/dashboard',
        text: 'Dashboard',
        icon: <SettingsIcon />,
    },
    {
        href: '/dashboard/orders',
        text: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        href: '/dashboard/addresses',
        text: 'Addresses',
        icon: <LocationOnIcon />,
    },
    // {
    //     href: '/dashboard/payment-methods',
    //     text: 'Payment methods',
    //     icon: 'list',
    // },
    {
        href: '/dashboard/account-info',
        text: 'Account details',
        icon: <PersonIcon />,
    },
    // {
    //     href: '/dashboard/paypal-payments',
    //     text: 'Paypal payments',
    //     icon: 'list',
    // },
    {
        href: '/dashboard/points',
        text: 'Points',
        icon: <SettingsIcon />,
    },
    {
        href: '/dashboard/wishlist',
        text: 'Your Wishlists',
        icon: <SettingsIcon />,
    },
    {
        href: '/dashboard/logout',
        text: 'Logout',
        icon: <ExitToAppIcon />,
    },
]

function Menu() {
    return (
        <div className={menuStyles.menuWrapper}>
            <h3>My Account</h3>
            <div className={menuStyles.menu}>
                {dashboardLinks.map(link => (
                    <Link href={link.href} key={link.href}>
                        {/* <li key={link.href} className={menuStyles.menuItem}> */}
                        <a className={menuStyles.menuItem}>
                            {link.icon}
                            <span className={menuStyles.menuItemText}>
                                {link.text}
                            </span>
                        </a>
                        {/* </li> */}
                    </Link>
                ))}
                {/* <li className={menuStyles.menuItem}>
                <div className={menuStyles.menuIcon}></div>
                <Link href='/'>
                    <a className={menuStyles.menuLink}>Home</a>
                </Link>
            </li> */}
            </div>
        </div>
    )
}

export default Menu
