import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import navStyles from '../styles/Nav.module.css'
import {Container, Row, Col} from 'react-bootstrap'
import {useGlobalContext} from '../contextAPI/context'
import PersonIcon from '@material-ui/icons/Person'

const Nav = () => {
    const {amount, authToken} = useGlobalContext()
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showShopDropdown, setShowShopDropdown] = useState(false)
    const [showCartDowpdown, setShowCartDowpdown] = useState(false)
    const [showSearchPopup, setShowSearchPopup] = useState(false)
    const [showInfoDropDown, setShowInfoDropDown] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992) {
                setShowMobileMenu(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleCartDropdown = () => {
        setShowCartDowpdown(!showCartDowpdown)
        setShowInfoDropDown(false)
        setShowShopDropdown(false)
        setShowSearchPopup(false)
    }

    const handleShopDropdown = () => {
        setShowShopDropdown(!showShopDropdown)
        setShowInfoDropDown(false)
        setShowCartDowpdown(false)
        setShowSearchPopup(false)
    }
    const handleSearchPopup = () => {
        setShowSearchPopup(!showSearchPopup)
        setShowInfoDropDown(false)
        setShowCartDowpdown(false)
        setShowShopDropdown(false)
    }

    const handleInfoDropDown = () => {
        setShowInfoDropDown(!showInfoDropDown)
        setShowCartDowpdown(false)
        setShowShopDropdown(false)
        setShowSearchPopup(false)
    }

    // useEffect(() => {
    //     console.log(`Show Mobile Menu: ${showMobileMenu}`)
    // }, [showMobileMenu])
    return (
        <nav className={navStyles.nav}>
            {/* Adding 3 columns */}
            <Container>
                <Row>
                    <Col className={navStyles.leftCol}>
                        <div className={navStyles.shop}>
                            <li
                                className={navStyles.navLink}
                                onClick={handleShopDropdown}
                            >
                                Shop
                            </li>
                            {showShopDropdown && (
                                <ul className={navStyles.shopDropdown}>
                                    <li>
                                        <Link href='/knives'>
                                            <a className={navStyles.navLink}>
                                                Knives
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/edc'>
                                            <a className={navStyles.navLink}>
                                                EDC
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/fidget'>
                                            <a className={navStyles.navLink}>
                                                Fidget
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/shop'>
                                            <a className={navStyles.navLink}>
                                                All products
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <form
                            action='/search'
                            className={navStyles.searchWrapper}
                        >
                            <input
                                type='text'
                                name='s'
                                placeholder='Search products'
                                required
                            />
                            <img
                                className={navStyles.searchIcon}
                                src='/images/search-icon.png'
                                alt=''
                            />
                        </form>
                    </Col>
                    <Col className={navStyles.middleCol}>
                        <Link href='/'>
                            <a>
                                <img src='/images/logo.png' alt='logo' />
                            </a>
                        </Link>
                    </Col>
                    <Col className={navStyles.rightCol}>
                        <Link href={`${authToken ? '/dashboard' : '/login'}`}>
                            <a className={navStyles.displayNoneAtMobile}>
                                <img
                                    src='/images/user-icon.png'
                                    alt='dashboard'
                                />
                            </a>
                        </Link>
                        <div
                            className={`${navStyles.displayNoneAtDesktop} mr1`}
                            onClick={handleSearchPopup}
                        >
                            <li>
                                <img
                                    src='/images/mobile-search-icon.png'
                                    alt='Search'
                                />
                            </li>
                        </div>
                        <div
                            onClick={handleInfoDropDown}
                            className={navStyles.infoWrapper}
                        >
                            <li
                                className={`${navStyles.navLink} ${navStyles.displayNoneAtMobile}`}
                            >
                                Info
                            </li>
                            {showInfoDropDown && <InfoDropDown />}
                        </div>
                        <div className={navStyles.cart}>
                            <li
                                className={navStyles.navLink}
                                onClick={handleCartDropdown}
                            >
                                <img src='/images/cart-icon.png' alt='Cart' />
                                {amount > 0 && (
                                    <span className={navStyles.amount}>
                                        {amount}
                                    </span>
                                )}
                            </li>
                        </div>
                        <button
                            className={`${navStyles.displayNoneAtDesktop} eventBtn`}
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            <img
                                src='/images/hambor.png'
                                alt='Menu'
                                className={navStyles.hamborIcon}
                            />
                        </button>
                        {showCartDowpdown && <MiniCart />}
                    </Col>
                </Row>
            </Container>
            {showMobileMenu && (
                <MobileMenu
                    showMobileMenu={showMobileMenu}
                    setShowMobileMenu={setShowMobileMenu}
                />
            )}
            {showSearchPopup && <MobileSearchPopup />}
        </nav>
    )
}
// Mobile Menu
const MobileMenu = ({showMobileMenu, setShowMobileMenu}) => {
    const {authToken} = useGlobalContext()
    return (
        <div className={navStyles.mobileMenu}>
            <Row>
                <Col
                    xs={6}
                    className='d-flex align-items-center justify-content-flex-start'
                >
                    <Link href='/'>
                        <a>
                            <img
                                src='/images/logo.png'
                                alt='logo'
                                className={navStyles.mobileLogo}
                            />
                        </a>
                    </Link>
                </Col>
                <Col
                    xs={6}
                    className='d-flex align-items-center justify-content-end'
                >
                    <button
                        className='eventBtn'
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        <img src='/images/close-icon.png' alt='close' />
                    </button>
                </Col>
            </Row>
            <Row className='d-flex flex-column align-items-center justify-content-center'>
                <Col sm={12} className={navStyles.mobileMenuSubCol}>
                    <li>
                        <Link href='/shop'>
                            <a className={navStyles.navLink}>SHOP</a>
                        </Link>
                    </li>
                    <li>
                        <hr id={navStyles.shopHr} />
                    </li>
                    <li>
                        <Link href='/knives'>
                            <a>knives</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/edc'>
                            <a>EDC</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/fidget'>
                            <a>Fidget</a>
                        </Link>
                    </li>
                </Col>
                <Col sm={12} className={navStyles.mobileMenuSubCol}>
                    <li style={{marginTop: '20px'}}>
                        {/* <Link href='/info'> */}
                        <p className={navStyles.navLink}>INFO</p>
                        {/* </Link> */}
                    </li>
                    <li>
                        <hr id={navStyles.infoHr} />
                    </li>
                    <li>
                        <Link href='/contact'>
                            <a>Contact us</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/shipping-information'>
                            <a>Ship info/track order</a>
                        </Link>
                    </li>
                </Col>
                <Col sm={12} className={navStyles.mobileMenuSubCol}>
                    <li style={{marginTop: '20px'}}>
                        <Link href={`${authToken ? '/dashboard' : '/login'}`}>
                            <a className={navStyles.navLink}>
                                {authToken ? (
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <PersonIcon />
                                        <span style={{marginLeft: '5px'}}>
                                            My Account
                                        </span>
                                    </div>
                                ) : (
                                    'LOGIN'
                                )}
                            </a>
                        </Link>
                    </li>
                    <li>
                        <hr id={navStyles.loginHr} />
                    </li>
                </Col>
            </Row>
        </div>
    )
}

const MiniCart = () => {
    const {cart, total, amount, removeItem} = useGlobalContext()
    return (
        <div className={navStyles.cartDropdown}>
            {/* <div className={navStyles.cartDropdownHeader}>
                <img src='/images/cart-icon.png' alt='Cart' />
                <span>
                    <Link href='/cart'>
                        <a>Cart</a>
                    </Link>
                </span>
            </div> */}
            <div className={navStyles.cartDropdownBody}>
                {cart && cart.length > 0
                    ? cart.map((item, itemIdx) => {
                          return (
                              <div key={itemIdx} className={navStyles.cartItem}>
                                  <div
                                      className={navStyles.cartDropdownBodyItem}
                                  >
                                      <Image
                                          src={item.img && item.img}
                                          alt={item.title}
                                          width={111}
                                          height={70}
                                      />
                                  </div>
                                  <div className={navStyles.cartInfoRight}>
                                      <div
                                          className={
                                              navStyles.cartDropdownBodyItemInfo
                                          }
                                      >
                                          <div
                                              className={
                                                  navStyles.cartDropdownBodyItemInfoLeft
                                              }
                                          >
                                              {/* <Link href='/'> */}
                                              {/* <a> */}
                                              <span>
                                                  <span
                                                      className={
                                                          navStyles.cartDropdownBodyItemInfoName
                                                      }
                                                  >
                                                      {item.title}
                                                  </span>
                                              </span>
                                              {/* </a> */}
                                              {/* </Link> */}
                                          </div>
                                          <div
                                              className={
                                                  navStyles.cartDropdownBodyItemInfoLeft
                                              }
                                          >
                                              <div
                                                  className={
                                                      navStyles.cartDropdownBodyItemQuantity
                                                  }
                                              >
                                                  <span>{item.amount}</span>
                                                  <span> x </span>
                                                  <span
                                                      className={
                                                          navStyles.cartDropdownBodyItemInfoPrice
                                                      }
                                                  >
                                                      $
                                                      {item.price
                                                          ? item.price
                                                          : 0}
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                      <div
                                          className={
                                              navStyles.cartDropdownBodyItemInfo
                                          }
                                      >
                                          <div
                                              className={
                                                  navStyles.cartDropdownBodyItemInfoLeft
                                              }
                                          >
                                              <li
                                                  className={
                                                      navStyles.cartDropdownBodyItemInfoName2
                                                  }
                                              >
                                                  {item.variation && (
                                                      <span>
                                                          <span
                                                              className={
                                                                  navStyles.cartDropdownBodyItemInfoName2
                                                              }
                                                          >
                                                              {item.variation}
                                                          </span>
                                                      </span>
                                                  )}
                                              </li>
                                              <li
                                                  onClick={() =>
                                                      removeItem(item.id)
                                                  }
                                                  className={navStyles.cross}
                                              >
                                                  <span>X</span>
                                              </li>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          )
                      })
                    : 'No items in cart'}

                {/* <div className={navStyles.cartItem}>
                    <div className={navStyles.cartDropdownBodyItem}>
                        <Image
                            src='/images/products/image-1-small.png'
                            alt='cart item'
                            width={111}
                            height={70}
                        />
                    </div>
                    <div className={navStyles.cartInfoRight}>
                        <div className={navStyles.cartDropdownBodyItemInfo}>
                            <div
                                className={
                                    navStyles.cartDropdownBodyItemInfoLeft
                                }
                            >
                                <Link href='/'>
                                    <a>
                                        <span>
                                            <span
                                                className={
                                                    navStyles.cartDropdownBodyItemInfoName
                                                }
                                            >
                                                Knife
                                            </span>
                                        </span>
                                    </a>
                                </Link>
                            </div>
                            <div
                                className={
                                    navStyles.cartDropdownBodyItemInfoLeft
                                }
                            >
                                <div
                                    className={
                                        navStyles.cartDropdownBodyItemQuantity
                                    }
                                >
                                    <span>1</span>
                                    <span> x </span>
                                    <span
                                        className={
                                            navStyles.cartDropdownBodyItemInfoPrice
                                        }
                                    >
                                        $55
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={navStyles.cartDropdownBodyItemInfo}>
                            <div
                                className={
                                    navStyles.cartDropdownBodyItemInfoLeft
                                }
                            >
                                <li
                                    className={
                                        navStyles.cartDropdownBodyItemInfoName2
                                    }
                                >
                                    <span>
                                        <span
                                            className={
                                                navStyles.cartDropdownBodyItemInfoName2
                                            }
                                        >
                                            Jade G10, Stonewashed 14c28n
                                        </span>
                                    </span>
                                </li>
                                <li className={navStyles.cross}>
                                    <span>X</span>
                                </li>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className={navStyles.cartDropdownFooter}>
                <div className={navStyles.cartDropdownFooterTop}>
                    <div>
                        <span>Subtotal: </span>
                        <span>${total}</span>
                    </div>
                </div>
                <div className={navStyles.cartDropdownFooterBottom}>
                    <li className={navStyles.updateCart}>
                        <Link href='/checkout'>
                            <a>Update Cart</a>
                        </Link>
                    </li>
                    <li className={navStyles.checkout}>
                        <Link href='/checkout'>
                            <a>Checkout</a>
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    )
}
// Mobile Search Popup
const MobileSearchPopup = () => {
    return (
        <div className={navStyles.mobileSearchPopup}>
            <form action='/search' className={navStyles.searchWrapper}>
                <input
                    type='text'
                    name='s'
                    placeholder='Search products'
                    required
                />
                <img
                    className={navStyles.searchIcon}
                    src='/images/search-icon.png'
                    alt=''
                />
            </form>
        </div>
    )
}
// Info dropdown
const InfoDropDown = () => {
    return (
        <div className={navStyles.infoDropDownWrapper}>
            <li>
                <Link href='/contact'>
                    <a>Contact</a>
                </Link>
            </li>
            <li>
                <Link href='/shipping-information'>
                    <a>Ship Info/ Track Order</a>
                </Link>
            </li>
        </div>
    )
}

export default Nav
