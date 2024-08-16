import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {Container, Row, Col} from 'react-bootstrap'
import contentStyles from './Content.module.css'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Content({category, searchTerm}) {
    const [sort, setSort] = useState('default')
    const [productsToShow, setProductsToShow] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const categories = [
        {id: 1143, name: 'edc'},
        {id: 840, name: 'fidget'},
        {id: 1181, name: 'knives'},
    ]
    const categoryToFetch = categories.find(cat => {
        return category === cat.name
    })
    const categoryId = categoryToFetch ? categoryToFetch.id : null
    // api call function
    const getProducts = async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            const response =
                searchTerm || searchTerm === ''
                    ? await axios.get(`/api/products?searchTerm=${searchTerm}`)
                    : await axios.get(`/api/products?categoryId=${categoryId}`)

            const products = await response.data.data
            setProductsToShow(products)
            setFilteredProducts(products)
            setIsLoading(false)
            setIsError(false)
            // console.log('Not Search Term', !searchTerm)
            // console.log('Products: ', products)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            // console.log(error)
        }
    }

    const handleSort = e => {
        // console.log('Sort', e.target.value)
        setSort(e.target.value)
        // sort default
        if (e.target.value === 'default') {
            setFilteredProducts(productsToShow)
        }
        // sort by price ascending
        if (e.target.value === 'price-asc') {
            const sortedProducts = [...filteredProducts].sort((a, b) => {
                return a.price - b.price
            })
            setFilteredProducts(sortedProducts)
        }
        // sort by price descending
        if (e.target.value === 'price-desc') {
            const sortedProducts = [...filteredProducts].sort((a, b) => {
                return b.price - a.price
            })
            setFilteredProducts(sortedProducts)
        }
        // sort by latest
        if (e.target.value === 'latest') {
            const sortedProducts = [...filteredProducts].sort((a, b) => {
                return (
                    new Date(b['date_created']).getTime() -
                    new Date(a['date_created']).getTime()
                )
            })
            setFilteredProducts(sortedProducts)
        }
        // sort by oldest
        if (e.target.value === 'oldest') {
            const sortedProducts = [...filteredProducts].sort((a, b) => {
                return (
                    new Date(a['date_created']).getTime() -
                    new Date(b['date_created']).getTime()
                )
            })
            setFilteredProducts(sortedProducts)
        }
        // sort by popularity
        if (e.target.value === 'popularity') {
            const sortedProducts = [...filteredProducts].sort((a, b) => {
                return b['total_sales'] - a['total_sales']
            })
            setFilteredProducts(sortedProducts)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <section className={contentStyles.content}>
            <Container>
                <Row className={contentStyles.filterBar}>
                    <Col className={contentStyles.filter}>
                        {/* Sort by Dropdown input with label */}
                        <div className={contentStyles.sortBy}>
                            <label
                                htmlFor='sortBy'
                                className='displayNoneAtMobile'
                            >
                                Sort by:
                            </label>
                            <select
                                id='sortBy'
                                className={contentStyles.sortByDropdown}
                                onChange={handleSort}
                            >
                                <option value='default'>Default sorting</option>
                                <option value='popularity'>
                                    Sort by popularity
                                </option>
                                <option value='latest'>Sort by latest</option>
                                <option value='oldest'>Sort by oldest</option>
                                <option value='price-asc'>
                                    Price: Low to High
                                </option>
                                <option value='price-desc'>
                                    Price: High to Low
                                </option>
                                {/* <option value='name-asc'>Name: A to Z</option>
                                <option value='name-desc'>Name: Z to A</option> */}
                            </select>
                        </div>
                    </Col>
                    <Col className={contentStyles.results}>
                        <p>
                            Showing all{' '}
                            <span>
                                {filteredProducts && filteredProducts.length}
                            </span>{' '}
                            results
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container>
                {isLoading && (
                    <Row className={contentStyles.productsSection}>
                        {[...Array(6)].map((item, index) => (
                            <Col key={index} className={contentStyles.product}>
                                <Skeleton height={250} />
                            </Col>
                        ))}
                    </Row>
                )}
                {!isLoading && searchTerm && (
                    <Row className={contentStyles.productsSection}>
                        <h3>
                            <strong>Query: </strong>
                            {searchTerm}
                        </h3>
                    </Row>
                )}
                <Row className={contentStyles.productsSection}>
                    {!isLoading &&
                        filteredProducts &&
                        filteredProducts.length === 0 && (
                            <Col
                                sm={12}
                                className={`${contentStyles.product} text-center`}
                            >
                                <p>No results found</p>
                            </Col>
                        )}
                    {filteredProducts &&
                        filteredProducts.map(product => (
                            <div key={product.id}>
                                <div className={contentStyles.product}>
                                    <Link href={`/product/${product.id}`}>
                                        <a>
                                            {product.images &&
                                                product.images.length > 0 && (
                                                    <Image
                                                        src={
                                                            product.images[0]
                                                                .src
                                                        }
                                                        width={445}
                                                        height={334}
                                                        alt={product.name}
                                                    />
                                                )}

                                            {/* <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={445}
                                                height={334}
                                            /> */}
                                        </a>
                                    </Link>
                                    <p className={contentStyles.productTitle}>
                                        {product.name}
                                    </p>
                                    <p className={contentStyles.productPrice}>
                                        {product.price
                                            ? `$${product.price}`
                                            : '$0'}
                                    </p>
                                </div>
                            </div>
                        ))}
                </Row>
            </Container>
        </section>
    )
}

export default Content
